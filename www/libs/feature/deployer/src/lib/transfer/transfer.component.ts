import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DeployerService } from '@casper-data/data-access-deployer';
import { ResultService } from '../result/result.service';
import { DeployReturn, State } from '@casper-api/api-interfaces';
import { Subscription } from 'rxjs';
import { CLPublicKey, CLURef, DeployUtil, motesToCSPR } from 'casper-js-sdk';
import { Result } from 'ts-results';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { WatcherService } from '@casper-util/watcher';

@Component({
  selector: 'casper-deployer-transfer',
  standalone: true,
  imports: [CommonModule],
  providers: [WatcherService],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferComponent implements AfterViewInit, OnDestroy {
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('amountElt') amountElt!: ElementRef;
  @ViewChild('transferToElt') transferToElt!: ElementRef;
  @ViewChild('transferFromElt') transferFromElt!: ElementRef;

  readonly window = this.document.defaultView;
  activePublicKey?: string;
  apiUrl?: string;

  private getStateSubscription!: Subscription;
  private deploy?: DeployUtil.Deploy;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly watcherService: WatcherService
  ) { }

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService.getState().subscribe((state: State) => {
      if (state.user?.activePublicKey) {
        this.activePublicKey = state.user.activePublicKey;
      }
      state.apiUrl && (this.apiUrl = state.apiUrl);
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
  }

  // TODO Refacto into service
  async transfer() {
    if (!this.activePublicKey) {
      this.connect.emit();
      return;
    }
    const publicKey = CLPublicKey.fromHex(this.activePublicKey);
    const amount = this.amountElt?.nativeElement.value.trim();
    const transferFrom = this.transferFromElt?.nativeElement.value.trim();
    const transferTo = this.transferToElt?.nativeElement.value.trim();
    let target: CLPublicKey | CLURef;
    if (transferTo.includes('uref-')) {
      target = CLURef.fromFormattedStr(transferTo);
      // This seems to be buggy, produces error in signer "Target from deploy was neither AccountHash or PublicKey"
    } else {
      target = CLPublicKey.fromHex(transferTo);
    }
    let sourcePurse!: CLURef;
    let transferFromPublicKey!: CLPublicKey;
    if (transferFrom.includes('uref-')) {
      sourcePurse = CLURef.fromFormattedStr(transferFrom);
      // This seems to be buggy, produces error in signer "Active key changed during signing"
      // can not retrieve publicKey from pure URef here
      // and sourcePurse can not be CLPublicKey ?
    } else if (transferFrom) {
      transferFromPublicKey = CLPublicKey.fromHex(transferFrom); // This seems to be buggy if transferFrom is not active public key, produces error in signer "Active key changed during signing"
    }
    const deployParams: DeployUtil.DeployParams = new DeployUtil.DeployParams(
      transferFromPublicKey ? transferFromPublicKey : publicKey,
      this.apiUrl?.includes(this.config['localhost']) ? this.config['chainName_localhost'] : this.config['chainName_test'],
      +this.config['gasPrice'],
      +this.config['TTL'],
      []
    );

    const session = amount && transferTo && DeployUtil.ExecutableDeployItem.newTransfer(amount, target, sourcePurse, Math.floor(Math.random() * +this.config['idMax']));
    if (!session) {
      console.error(deployParams, session);
      return;
    }
    const payment = DeployUtil.standardPayment(+this.config['gasFeeTransfer']);
    this.deploy = DeployUtil.makeDeploy(deployParams, session, payment);
    this.deploy && this.resultService.setResult<DeployUtil.Deploy>('Transfer', DeployUtil.deployToJson(this.deploy));
    const signedDeployToJson = this.deploy && await this.window?.casperlabsHelper.sign(
      DeployUtil.deployToJson(this.deploy),
      transferFrom,
      transferTo
    );
    const signedDeploy: Result<DeployUtil.Deploy, Error> = DeployUtil.deployFromJson(signedDeployToJson);
    if (signedDeploy.err) {
      console.error(signedDeploy.val.message);
      return;
    }
    this.deployerService.putDeploy(signedDeploy.val, this.apiUrl).subscribe(deploy => {
      const deploy_hash = (deploy as DeployReturn).deploy_hash;
      deploy_hash && this.resultService.setResult<DeployUtil.Deploy>('Deploy Hash', deploy_hash);
      deploy_hash && this.deployerService.setState({ deploy_hash });
      deploy_hash && this.watcherService.watchDeploy(deploy_hash, this.apiUrl);
    });
  }

  get isButtonDisabled() {
    return !this.transferToElt?.nativeElement.value ||
      !this.amountElt?.nativeElement.value;
  }

  convert() {
    const amount = this.amountElt?.nativeElement.value.trim();
    if (!amount) {
      return;
    }
    // TODO Fix with motesToCSPR
    return (Number(BigInt(amount * 100) / BigInt(1e+9)) / 100).toLocaleString();
  }
}
