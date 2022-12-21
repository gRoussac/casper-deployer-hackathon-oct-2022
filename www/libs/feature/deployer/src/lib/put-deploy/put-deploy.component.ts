import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DeployReturn, State } from '@casper-api/api-interfaces';
import { CLPublicKey, CLValueBuilder, DeployUtil, RuntimeArgs, Contracts, decodeBase16, CLByteArray, CLPublicKeyTag, CLURef, CLAccountHash, CLKey } from 'casper-js-sdk';
import { ResultService } from '../result/result.service';
import { Subscription } from 'rxjs';
import { DeployerService } from '@casper-data/data-access-deployer';
import { Result } from 'ts-results';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { Toaster, TOASTER_TOKEN } from '@casper-util/toaster';
import { WatcherService } from '@casper-util/watcher';
import { StorageService } from '@casper-util/storage';

@Component({
  selector: 'casper-deployer-put-deploy',
  standalone: true,
  imports: [CommonModule],
  providers: [WatcherService],
  templateUrl: './put-deploy.component.html',
  styleUrls: ['./put-deploy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PutDeployComponent implements AfterViewInit, OnDestroy {
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('chainNameElt') chainNameElt!: ElementRef;
  @ViewChild('chainNameSelectElt') chainNameSelectElt!: ElementRef;
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
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster,
    private readonly deployerService: DeployerService,
    private readonly watcherService: WatcherService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly storageService: StorageService
  ) { }

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService.getState().subscribe((state: State) => {
      if (state.user?.activePublicKey) {
        this.activePublicKey = state.user.activePublicKey;
        this.publicKey = this.activePublicKey;
        this.publicKeyElt.nativeElement.value = this.publicKey;
      }
      if (state.apiUrl && this.apiUrl !== state.apiUrl) {
        this.apiUrl = state.apiUrl;
        let chainName: string;
        if (this.apiUrl.includes(this.config['apiUrl_localhost'])) {
          chainName = this.config['chainName_localhost'];
        } else {
          chainName = this.config['chainName_test'];
        }
        this.selectChainNameOption(chainName);
      }
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
  }

  selectChainName($event: Event) {
    this.setChainName(($event.target as HTMLSelectElement).value);
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
      deployParams: DeployUtil.DeployParams = new DeployUtil.DeployParams(
        publicKey,
        chainName,
        +this.config['gasPrice'],
        ttl,
        dependencies
      ),
      argsValue: string = this.argsElt?.nativeElement.value as string,
      argsValues = !!argsValue && (argsValue as string).split(','),
      args: RuntimeArgs = RuntimeArgs.fromNamedArgs([]);
    const allowed_builder_functions = Object.keys(CLValueBuilder);
    argsValues && argsValues.forEach(arg => {
      const argKeyValue = arg.split('=');
      let [key, type] = argKeyValue[0].trim().split(':');
      let value: string | CLKey | CLURef | CLPublicKey = argKeyValue[1].trim().replace(this.quoteRegex, '');
      const fn = type ? type : 'string';
      if (!key || !value || !allowed_builder_functions.includes(fn)) {
        return;
      }
      try {
        const caster_fn: unknown = CLValueBuilder[fn as keyof CLValueBuilder];
        if (['publickey', 'key'].includes(type)) {
          const public_key_as_array = decodeBase16(value);
          const type_key = public_key_as_array.slice(0, 1).toString();
          const public_key = CLValueBuilder.publicKey(
            public_key_as_array.slice(1),
            +type_key as CLPublicKeyTag
          );
          value = type === 'publickey' ? public_key : CLValueBuilder.key(
            public_key
          );
        }
        else if (['uref'].includes(type)) {
          value = CLURef.fromFormattedStr(value);
        }
        if (typeof value === 'object') {
          value && args.insert(key, value);
        } else {
          // TODO Fix any type
          const CLValue = (caster_fn as any)(value);
          CLValue && args.insert(key, CLValue);
        }
      } catch (err) {
        console.error('Error with arg', key, type, value, err);
        this.toastr.error([key, type, value, err].join(' '), 'Error with arg');
      }
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
      this.toastr.error('', 'Error with deployParams');
      return;
    }
    const payment = DeployUtil.standardPayment(gasFee);
    this.deploy = DeployUtil.makeDeploy(deployParams, session, payment);
    this.deploy && this.resultService.setResult<DeployUtil.Deploy>('Deploy', DeployUtil.deployToJson(this.deploy));
    if (!DeployUtil.validateDeploy(this.deploy)) {
      console.error(this.deploy);
      this.toastr.error('', 'Error with invalid deploy');
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
    // TODO Bug is signer
    if (!signedDeployToJson) {
      console.error(this.window?.casperlabsHelper.sign, publicKey);
      this.toastr.error(publicKey, 'Error with signer deploy');
      this.connect.emit();
      return;
    }
    const signedDeploy: Result<DeployUtil.Deploy, Error> = DeployUtil.deployFromJson(signedDeployToJson);
    if (signedDeploy.err) {
      this.toastr.error(signedDeploy.val.message, 'Error with signedDeploy');
      console.error(signedDeploy.val.message);
      return;
    }
    if (this.deploy && !DeployUtil.validateDeploy(this.deploy)) {
      this.toastr.error(this.deploy.hash.toString(), 'Error with validateDeploy');
      console.error(this.deploy);
      return;
    }
    if (!sendDeploy) {
      return signedDeploy.val;
    }
    this.deployerService.putDeploy(signedDeploy.val, this.apiUrl).subscribe(deploy => {
      const deploy_hash = (deploy as DeployReturn).deploy_hash;
      deploy && this.resultService.setResult<DeployUtil.Deploy>('Deploy Hash', deploy_hash || deploy);
      this.deployerService.setState({ deploy_hash });
      deploy_hash && this.watcherService.watchDeploy(deploy_hash, this.apiUrl);
      this.storageService.setState({ apiUrl: this.apiUrl, deploy_hash });
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

  resetFirstForm($event: Event) {
    $event.preventDefault();
    this.publicKeyElt.nativeElement.value = '';
    this.gasFeeElt.nativeElement.value = '';
    this.TTLElt.nativeElement.value = '';
  }

  resetSecondForm($event?: Event) {
    $event?.preventDefault();
    this.sessionNameElt.nativeElement.value = '';
    this.sessionHashElt.nativeElement.value = '';
    this.entryPointElt.nativeElement.value = '';
    this.argsElt.nativeElement.value = '';
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
    this.resetSecondForm();
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

  private setChainName(value: string) {
    this.chainNameElt.nativeElement.value = value;
  }

  private selectChainNameOption(chainName: string) {
    const select = (this.chainNameSelectElt.nativeElement as HTMLSelectElement);
    chainName && Array.prototype.slice.call(select.options).find((option, index) => {
      const match = option.value.includes(chainName);
      if (match) {
        select.selectedIndex = index;
        this.setChainName(chainName);
      }
      return match;
    });
  }
}
