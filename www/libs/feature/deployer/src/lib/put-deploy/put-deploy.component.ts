import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DeployReturn, State } from '@casper-api/api-interfaces';
import { CLPublicKey, CLValueBuilder, DeployUtil, RuntimeArgs, Contracts } from 'casper-js-sdk';
import { DeployParams } from 'casper-js-sdk/dist/lib/DeployUtil';
import { ResultService } from '../result/result.service';
import { Subscription } from 'rxjs';
import { DeployerService } from '@casper-data/data-access-deployer';
import { Result } from 'ts-results';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';

@Component({
  selector: 'casper-deployer-put-deploy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './put-deploy.component.html',
  styleUrls: ['./put-deploy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PutDeployComponent implements AfterViewInit, OnDestroy {
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('chainNameElt') chainNameElt!: ElementRef;
  @ViewChild('versionElt') versionElt!: ElementRef;
  @ViewChild('gasFeeElt') gasFeeElt!: ElementRef;
  @ViewChild('TTLElt') TTLElt!: ElementRef;
  @ViewChild('sessionPathElt') sessionPathElt!: ElementRef;
  @ViewChild('sessionHashElt') sessionHashElt!: ElementRef;
  @ViewChild('sessionNameElt') sessionNameElt!: ElementRef;
  @ViewChild('entryPointElt') entryPointElt!: ElementRef;
  @ViewChild('publicKeyElt') publicKeyElt!: ElementRef;
  @ViewChild('argsElt') argsElt!: ElementRef;
  @ViewChild('isPackageElt') isPackageElt!: ElementRef;

  readonly window = this.document.defaultView;
  readonly quoteRegex = new RegExp(['^', "'", '+|', "'", '+$'].join(''), 'g');
  activePublicKey?: string;
  publicKey?: string;
  apiUrl?: string;
  gasFee = this.config['gasFee'];
  TTL = this.config['TTL'];
  sessionPath!: string;
  sessionName!: string;
  sessionHash!: string;
  entryPoint!: string;
  file_name!: string;
  version!: string;
  args!: string;
  animate!: boolean;

  private wasm!: Uint8Array | undefined;
  private deploy?: DeployUtil.Deploy;
  private getStateSubscription!: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService.getState().subscribe((state: State) => {
      if (state.user?.activePublicKey) {
        this.activePublicKey = state.user.activePublicKey;
        this.publicKey = this.activePublicKey;
        this.publicKeyElt.nativeElement.value = this.publicKey;
      }
      state.apiUrl && (this.apiUrl = state.apiUrl);
      this.changeDetectorRef.markForCheck();
    });
  };

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
  }

  selectChainName($event: Event) {
    this.chainNameElt.nativeElement.value = ($event.target as HTMLInputElement).value;
  }

  // TODO Refacto into service
  makeDeploy(): void {
    const publicKeyValue = this.publicKeyElt?.nativeElement.value;
    if (!publicKeyValue) {
      this.connect.emit();
      return;
    }
    const publicKey = CLPublicKey.fromHex(publicKeyValue),
      chainName = this.chainNameElt?.nativeElement.value,
      sessionPath = this.sessionPathElt?.nativeElement.value,
      sessionName = this.sessionNameElt?.nativeElement.value,
      sessionHash = this.sessionHashElt?.nativeElement.value.split('-').pop(),
      entryPoint = this.entryPointElt?.nativeElement.value,
      version = +this.versionElt?.nativeElement.argsValues || null,
      gasFee = this.gasFeeElt?.nativeElement.value,
      ttl = +this.TTLElt?.nativeElement.value,
      isPackageElt = this.isPackageElt?.nativeElement.checked,
      dependencies: Uint8Array[] = [],
      deployParams: DeployParams = new DeployUtil.DeployParams(
        publicKey,
        chainName,
        +this.config['gasPrice'],
        ttl,
        dependencies
      ),
      argsValue: string = this.argsElt?.nativeElement.value as string,
      argsValues = !!argsValue && (argsValue as string).split(','),
      args: RuntimeArgs = RuntimeArgs.fromNamedArgs([]);
    argsValues && argsValues.forEach(arg => {
      const argKeyValue = arg.split('='),
        key = argKeyValue[0].trim().split(':').shift() as string,
        CLValue = argKeyValue.length > 1 &&
          CLValueBuilder.string(argKeyValue[1].trim().replace(this.quoteRegex, ''));
      CLValue && args.insert(key, CLValue);
    });
    let session = sessionPath && this.wasm && DeployUtil.ExecutableDeployItem.newModuleBytes(this.wasm as Uint8Array, args);
    if (!isPackageElt) {
      sessionName && (session = DeployUtil.ExecutableDeployItem.newStoredContractByName(sessionName, entryPoint, args));
      sessionHash && (session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(Contracts.contractHashToByteArray(sessionHash), entryPoint, args));
    } else {
      sessionName && (session = DeployUtil.ExecutableDeployItem.newStoredVersionContractByName(sessionName, version, entryPoint, args));
      sessionHash && (session = DeployUtil.ExecutableDeployItem.newStoredVersionContractByHash(Contracts.contractHashToByteArray(sessionHash), version, entryPoint, args));
    }
    if (!session) {
      console.error(deployParams, session);
      return;
    }
    const payment = DeployUtil.standardPayment(gasFee);
    this.deploy = DeployUtil.makeDeploy(deployParams, session, payment);
    this.deploy && this.resultService.setResult<DeployUtil.Deploy>('Deploy', DeployUtil.deployToJson(this.deploy));
    if (!DeployUtil.validateDeploy(this.deploy)) {
      console.error(this.deploy);
    }
  }

  async signDeploy(sendDeploy = true): Promise<DeployUtil.Deploy | void> {
    const publicKey = this.publicKeyElt?.nativeElement.value;
    if (!publicKey) {
      this.connect.emit();
      return;
    }
    this.makeDeploy();
    const signedDeployToJson = this.deploy && await this.window?.casperlabsHelper.sign(
      DeployUtil.deployToJson(this.deploy),
      publicKey
    );
    const signedDeploy: Result<DeployUtil.Deploy, Error> = DeployUtil.deployFromJson(signedDeployToJson);
    if (signedDeploy.err) {
      console.error(signedDeploy.val.message);
      return;
    }
    if (this.deploy && !DeployUtil.validateDeploy(this.deploy)) {
      console.error(this.deploy);
      return;
    }
    if (!sendDeploy) {
      return signedDeploy.val;
    }
    this.deployerService.putDeploy(signedDeploy.val, this.apiUrl).subscribe(deploy => {
      const deploy_hash = (deploy as DeployReturn).deploy_hash;
      deploy && this.resultService.setResult<DeployUtil.Deploy>('Deploy Hash', deploy_hash);
      this.deployerService.setState({ deploy_hash });
    });
  }

  async speculativeDeploy() {
    const speculative = true, sendDeploy = false;
    this.makeDeploy();
    const signedDeploy = await this.signDeploy(sendDeploy);
    signedDeploy && (this.deployerService.putDeploy(signedDeploy, this.apiUrl, speculative).subscribe(deploy => {
      deploy && this.resultService.setResult<DeployUtil.Deploy>('Speculative Deploy Hash', (deploy as DeployReturn).deploy_hash);
    }));
  }

  reset() {
    this.resetSessionPathElt();
  }

  resetSessionPathElt() {
    this.sessionPathElt.nativeElement.value = '';
    this.wasm = undefined;
    this.file_name = '';
    this.deploy = undefined;
  }

  copy(value: string) {
    this.resultService.copyClipboard(value);
  }

  get isMakeDeployDisabled() {
    return !this.isFormValid();
  }

  get isSessionNameDisabled(): boolean {
    return this.sessionPathElt?.nativeElement.value || this.sessionHashElt?.nativeElement.value;
  }

  get isSessionHashDisabled(): boolean {
    return this.sessionPathElt?.nativeElement.value || this.sessionNameElt?.nativeElement.value;
  }

  get isEntryPointDisabled(): boolean {
    return this.sessionPathElt?.nativeElement.value;
  }

  get isVersionDisabled(): boolean {
    return this.isEntryPointDisabled;
  }

  get isArgsDisabled(): boolean {
    return false;
  }

  async onFileSelected(event: Event) {
    this.animate = true;
    this.file_name = this.sessionPathElt?.nativeElement.value.split('\\').pop();
    const file = (event.target as HTMLInputElement).files?.item(0), buffer = await file?.arrayBuffer();
    this.wasm = buffer && new Uint8Array(buffer);
    this.animate = false;
    this.changeDetectorRef.markForCheck();
  }

  private isFormValid() {
    const firstCondition = this.publicKeyElt?.nativeElement.value &&
      this.chainNameElt?.nativeElement.value &&
      this.gasFeeElt?.nativeElement.value &&
      this.TTLElt?.nativeElement.value,
      secondCondition = this.sessionPathElt?.nativeElement.value ||
        this.sessionNameElt?.nativeElement.value ||
        this.sessionHashElt?.nativeElement.value;
    return firstCondition && secondCondition;
  }
}
