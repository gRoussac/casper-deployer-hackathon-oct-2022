import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TransactionReturn,
  NamedCLTypeArg,
  State,
  extractEntryPoints,
  parameterToNamedArg,
} from '@casper-api/api-interfaces';
import { ResultService } from '../result/result.service';
import { Subscription } from 'rxjs';
import { DeployerService } from '@casper-data/data-access-deployer';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { Toaster, TOASTER_TOKEN } from '@casper-util/toaster';
import { WatcherService } from '@casper-util/watcher';
import { StorageService } from '@casper-util/storage';
import { DeployService } from '@casper-util/deploy';
import { Transaction, PublicKey, motesToCSPR } from 'casper-rust-wasm-sdk';
import { WalletService } from '@casper-util/wallet';

type EntrypointsType = { [key: string]: string };

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
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('chainNameElt') chainNameElt!: ElementRef;
  @ViewChild('chainNameSelectElt') chainNameSelectElt!: ElementRef;
  @ViewChild('versionElt') versionElt!: ElementRef;
  @ViewChild('gasFeeElt') gasFeeElt!: ElementRef;
  @ViewChild('TTLElt') TTLElt!: ElementRef;
  @ViewChild('sessionPathElt') sessionPathElt!: ElementRef;
  @ViewChild('sessionHashElt') sessionHashElt!: ElementRef;
  @ViewChild('sessionNameElt') sessionNameElt!: ElementRef;
  @ViewChild('entryPointElt') entryPointElt!: ElementRef;
  @ViewChild('selectEntryPointElt') selectEntryPointElt!: ElementRef;
  @ViewChild('publicKeyElt') publicKeyElt!: ElementRef;
  @ViewChild('argsElt') argsElt!: ElementRef;
  @ViewChild('isPackageElt') isPackageElt!: ElementRef;
  @Input() set argument(value: string) {
    if (!value) {
      return;
    }
    this._argument = value.trim();
    setTimeout(() => {
      this.onArgsChange();
    });
  }

  get argument(): string {
    return this._argument;
  }

  readonly quoteRegex = new RegExp(['^', "'", '+|', "'", '+$'].join(''), 'g');
  activePublicKey?: string;
  publicKey?: string;
  apiUrl?: string;
  gasFee!: string;
  TTL!: string;
  sessionPath!: string;
  sessionName!: string;
  sessionHash!: string;
  entryPoint!: string;
  file_name!: string;
  loadedSignedTransaction?: string;
  version!: string;
  animate!: boolean;
  stateRootHash?: string;
  chain_name?: string;
  options: string[] = [''];
  key!: string;

  private wasm!: Uint8Array | undefined;
  private transaction?: Transaction;
  private getStateSubscription!: Subscription;
  private getBlockStateSubscription!: Subscription;
  private contract_entrypoints!: EntrypointsType[];
  private _argument!: string;

  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster,
    private readonly deployerService: DeployerService,
    private readonly watcherService: WatcherService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly storageService: StorageService,
    private readonly deployService: DeployService,
    private readonly walletService: WalletService,
  ) {
    this.gasFee = this.config['gasFee'];
    this.TTL = this.config['TTL'];
  }

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService
      .getState()
      .subscribe((state: State) => {
        if (state.user?.activePublicKey) {
          this.activePublicKey = state.user.activePublicKey;
          this.publicKey = this.activePublicKey;
          this.publicKeyElt.nativeElement.value = this.publicKey;
        }
        if (state.apiUrl && this.apiUrl !== state.apiUrl) {
          this.apiUrl = state.apiUrl;
          let chainName: string | undefined =
            this.storageService.get('chain_name') || undefined;

          if (
            this.apiUrl.includes(this.config['default_node_localhost']) ||
            /:1110[1-5]\b/.test(this.apiUrl)
          ) {
            chainName = this.config['chain_name_localhost'];
          } else if (
            this.apiUrl.includes(this.config['default_node_testnet'])
          ) {
            chainName = this.config['chain_name_testnet'];
          } else if (
            this.apiUrl.includes(this.config['default_node_mainnet'])
          ) {
            chainName = this.config['chain_name_mainnet'];
          }
          // Custom URL: keep stored/editable chain name

          if (chainName) {
            this.selectChainNameOption(chainName);
            this.chain_name = chainName;
          }
        }
        if (state.stateRootHash) {
          this.stateRootHash = state.stateRootHash;
        }
        if (state.stateRootHash || state.user?.activePublicKey) {
          this.checkEntryPoints();
        }
        this.changeDetectorRef.markForCheck();
      });
    const deploy_args = this.storageService.get('deploy_args');
    deploy_args && (this.argsElt.nativeElement.value = deploy_args);
    const fee = this.storageService.get('fee');
    fee && (this.gasFeeElt.nativeElement.value = fee);
    const sessionName = this.storageService.get('sessionName');
    const sessionHash = this.storageService.get('sessionHash');
    const key = this.storageService.get('key');
    const entry_point = this.storageService.get('entry_point');
    sessionName && (this.sessionName = sessionName);
    sessionHash && (this.sessionHash = sessionHash);
    key && (this.key = key);
    entry_point && (this.entryPoint = entry_point);
  }

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
    this.getBlockStateSubscription &&
      this.getBlockStateSubscription.unsubscribe();
  }

  selectChainName($event: Event) {
    this.setChainName(($event.target as HTMLSelectElement).value);
  }

  onChainNameInput() {
    const chain_name = this.chainNameElt?.nativeElement.value?.trim() || '';
    if (!chain_name) {
      return;
    }
    this.setChainName(chain_name);
    this.selectChainNameOption(chain_name, false);
  }

  onGasFeeChange() {
    const fee = this.gasFeeElt.nativeElement.value;
    fee && this.storageService.setState({ fee });
  }

  makeTransaction(): void {
    const publicKeyAsString = this.publicKeyElt?.nativeElement.value?.trim();
    if (!publicKeyAsString) {
      this.connect.emit();
      return;
    }
    const chain_name: string =
        this.chainNameElt?.nativeElement.value?.trim() || '',
      initiator_addr: string = publicKeyAsString,
      session_path: string =
        this.sessionPathElt?.nativeElement.value?.trim() || '',
      session_name: string =
        this.sessionNameElt?.nativeElement.value?.trim() || '',
      session_hash: string =
        this.sessionHashElt?.nativeElement.value?.trim() || '',
      session_entry_point: string =
        (
          this.entryPointElt?.nativeElement.value ||
          this.selectEntryPointElt?.nativeElement.value
        )
          ?.toString()
          .trim() || '',
      session_version: string =
        (+this.versionElt?.nativeElement.value?.trim()).toString() || '',
      session_args_json: string =
        this.argsElt?.nativeElement.value?.trim() || '',
      payment_amount: string =
        this.gasFeeElt?.nativeElement.value?.trim() || '',
      ttl: string = this.TTLElt?.nativeElement.value?.trim() || '',
      session_call_package = !!this.isPackageElt?.nativeElement.checked;

    this.transaction = this.deployService.makeTransaction(
      { initiator_addr, chain_name, ttl },
      {
        session_path,
        session_name,
        session_hash,
        session_entry_point,
        session_version,
        session_args_json,
        session_call_package,
        is_install_upgrade: !!session_path,
      },
      payment_amount,
      this.wasm,
    );
    this.transaction &&
      this.resultService.setResult<Transaction>(
        'Transaction',
        this.transaction,
      );
  }

  /** @deprecated Use makeTransaction */
  makeDeploy(): void {
    this.makeTransaction();
  }

  async signTransaction(sendTransaction = true): Promise<string | void> {
    const publicKey = this.publicKeyElt?.nativeElement.value;
    if (!publicKey) {
      this.connect.emit();
      return;
    }
    try {
      this.makeTransaction();
      const signedTransactionToJson =
        this.transaction &&
        (await this.walletService.signTransaction(this.transaction, publicKey));

      if (!signedTransactionToJson) {
        this.toastr.error(publicKey, 'Error with signed transaction');
        this.connect.emit();
        return;
      }
      const signedTransaction = new Transaction(signedTransactionToJson);
      if (signedTransaction && !signedTransaction.verify()) {
        this.toastr.warning(
          signedTransaction.toString(),
          'Transaction verify warning',
        );
        console.warn(this.transaction);
      }
      const transaction = signedTransaction.toJson();
      if (!transaction) {
        return '';
      }
      if (!sendTransaction) {
        this.resultService.setResult<Transaction>(
          'Signed Transaction',
          transaction,
        );
        return JSON.stringify(transaction);
      }
      this.deployerService
        .putTransaction(JSON.stringify(transaction), this.apiUrl)
        .subscribe((result: string | TransactionReturn) => {
          const transaction_hash = (result as TransactionReturn)
            .transaction_hash;
          transaction_hash &&
            this.resultService.setResult<string>(
              'Transaction Hash',
              transaction_hash || (result as string),
            );
          if (transaction_hash) {
            this.deployerService.setState({
              transaction_hash,
              deploy_hash: transaction_hash,
            });
            this.watcherService.watchTransaction(transaction_hash, this.apiUrl);
            this.storageService.setState({
              transaction_hash,
              deploy_hash: transaction_hash,
            });
          }
        });
    } catch (err) {
      console.error(err);
    }
  }

  /** @deprecated Use signTransaction */
  async signDeploy(sendDeploy = true): Promise<string | void> {
    return this.signTransaction(sendDeploy);
  }

  async onSignedTransactionFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (!file) {
      return;
    }
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const signed = new Transaction(parsed);
      if (signed && !signed.verify()) {
        this.toastr.warning(
          signed.toString(),
          'Loaded transaction verify warning',
        );
      }
      this.loadedSignedTransaction = JSON.stringify(signed.toJson() || parsed);
      this.resultService.setResult<Transaction>(
        'Loaded Signed Transaction',
        signed.toJson() || parsed,
      );
      this.changeDetectorRef.markForCheck();
    } catch (err) {
      console.error(err);
      this.toastr.error(String(err), 'Invalid signed transaction JSON');
      this.loadedSignedTransaction = undefined;
    }
    (event.target as HTMLInputElement).value = '';
  }

  sendLoadedTransaction() {
    if (!this.loadedSignedTransaction) {
      return;
    }
    this.deployerService
      .putTransaction(this.loadedSignedTransaction, this.apiUrl)
      .subscribe((result: string | TransactionReturn) => {
        const transaction_hash = (result as TransactionReturn).transaction_hash;
        transaction_hash &&
          this.resultService.setResult<string>(
            'Transaction Hash',
            transaction_hash || (result as string),
          );
        if (transaction_hash) {
          this.deployerService.setState({
            transaction_hash,
            deploy_hash: transaction_hash,
          });
          this.watcherService.watchTransaction(transaction_hash, this.apiUrl);
          this.storageService.setState({
            transaction_hash,
            deploy_hash: transaction_hash,
          });
        }
      });
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
    this.entryPoint = '';
    this.resetOptions();
    this.storageService.setState({
      sessionName: '',
      sessionHash: '',
      entry_point: '',
    });
    this.updateArgs();
  }

  resetSessionPathElt() {
    this.sessionPathElt.nativeElement.value = '';
    this.wasm = undefined;
    this.file_name = '';
    this.transaction = undefined;
    this.deployerService.setState({ has_wasm: false });
  }

  copy(value: string) {
    this.resultService.copyClipboard(value);
  }

  get isMakeTransactionDisabled() {
    return !this.isFormValid();
  }

  /** @deprecated Use isMakeTransactionDisabled */
  get isMakeDeployDisabled() {
    return this.isMakeTransactionDisabled;
  }

  get isSessionNameDisabled(): boolean {
    return (
      this.sessionPathElt?.nativeElement.value ||
      this.sessionHashElt?.nativeElement.value
    );
  }

  get isSessionHashDisabled(): boolean {
    return (
      this.sessionPathElt?.nativeElement.value ||
      this.sessionNameElt?.nativeElement.value
    );
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
    const file = (event.target as HTMLInputElement).files?.item(0),
      buffer = await file?.arrayBuffer();
    this.wasm = buffer && new Uint8Array(buffer);
    this.animate = false;
    this.resetSecondForm();
    this.deployerService.setState({ has_wasm: true });
    this.changeDetectorRef.markForCheck();
  }

  convert() {
    const amount = this.gasFeeElt?.nativeElement.value.trim();
    if (!amount) {
      return;
    }
    return motesToCSPR(amount);
  }

  onEdit() {
    this.edit.emit();
  }

  onArgsChange() {
    const deploy_args = this.argsElt?.nativeElement.value;
    deploy_args && this.storageService.setState({ deploy_args });
  }

  resetArgs() {
    this.argsElt.nativeElement.value = '';
    this.storageService.setState({ deploy_args: '' });
  }

  onSessionNameChange($event: Event) {
    const sessionName: string = ($event.target as HTMLInputElement).value;
    const sessionHash = ($event.target as HTMLInputElement).value;
    this.storageService.setState({ sessionName });
    if (sessionName) {
      this.getEntryPoints(sessionName);
      this.sessionName = sessionName;
    } else if (!sessionHash) {
      this.resetOptions();
      this.contract_entrypoints = [];
    }
  }

  onSessionHashChange($event: Event) {
    const sessionHash = ($event.target as HTMLInputElement).value;
    const sessionName: string = ($event.target as HTMLInputElement).value;
    this.storageService.setState({ sessionHash });
    if (sessionHash) {
      this.getEntryPoints('', sessionHash);
      this.sessionHash = sessionHash;
    } else if (!sessionName) {
      this.resetOptions();
      this.contract_entrypoints = [];
    }
  }

  private getEntryPoints(sessionName: string, hash?: string) {
    const publicKey = this.publicKeyElt?.nativeElement.value;
    if (sessionName && !publicKey && !this.key) {
      return;
    }
    const key =
      hash ||
      (publicKey &&
        new PublicKey(publicKey).toAccountHash().toFormattedString()) ||
      this.key;
    key &&
      this.stateRootHash &&
      (this.getBlockStateSubscription = this.deployerService
        .getBlockState(this.stateRootHash, key, sessionName, this.apiUrl)
        .subscribe(async (storedValue: object | string): Promise<void> => {
          const isString = typeof storedValue === 'string';
          if (!isString) {
            const contract_entrypoints = extractEntryPoints(
              storedValue,
            ) as EntrypointsType[];
            contract_entrypoints.length &&
              (this.contract_entrypoints = contract_entrypoints);
            this.resetOptions();
            if (contract_entrypoints.length) {
              contract_entrypoints.forEach((key) => {
                key && this.options.push(key['name']);
              });
            }
            this.entryPoint && this.updateArgs(this.entryPoint);
            this.changeDetectorRef.markForCheck();
          }
        }));
  }

  private resetOptions() {
    this.options = [''];
  }

  private updateArgs(entry_point_value?: string) {
    if (entry_point_value && this.contract_entrypoints) {
      const entry_point = this.contract_entrypoints.find(
        (entry_point: EntrypointsType) =>
          entry_point['name'] === entry_point_value,
      );
      const rawArgs = entry_point?.['args'];
      const args = Array.isArray(rawArgs)
        ? (rawArgs
            .map((param: unknown) => parameterToNamedArg(param as { name?: string; cl_type?: unknown }))
            .filter(Boolean) as NamedCLTypeArg[])
        : [];
      this.storageService.setState({
        args,
        entry_point: entry_point_value,
      });
      this.deployerService.setState({
        args,
        entry_point: entry_point_value,
      });
    } else {
      this.storageService.setState({ args: [], entry_point: '' });
      this.deployerService.setState({ args: [], entry_point: '' });
    }
  }

  inputEntryPointChange($event: Event) {
    const entry_point_value = ($event.target as HTMLSelectElement).value;
    this.updateArgs(entry_point_value || undefined);
    this.entryPoint = entry_point_value;
  }

  selectEntryPointChange($event: Event) {
    const entry_point_value = ($event.target as HTMLSelectElement).value;
    this.updateArgs(entry_point_value || undefined);
    this.entryPoint = entry_point_value;
  }

  publicKeyChange() {
    this.checkEntryPoints();
  }

  select($event: Event) {
    ($event.target as HTMLInputElement).select();
  }

  private checkEntryPoints() {
    if (this.sessionName) {
      this.getEntryPoints(this.sessionName);
    } else if (this.sessionHash) {
      this.getEntryPoints('', this.sessionHash);
    }
  }

  private isFormValid() {
    const firstCondition =
        this.publicKeyElt?.nativeElement.value &&
        this.chainNameElt?.nativeElement.value &&
        this.gasFeeElt?.nativeElement.value &&
        this.TTLElt?.nativeElement.value,
      secondCondition =
        this.sessionPathElt?.nativeElement.value ||
        this.sessionNameElt?.nativeElement.value ||
        this.sessionHashElt?.nativeElement.value;
    return firstCondition && secondCondition;
  }

  private setChainName(chain_name: string) {
    this.chainNameElt.nativeElement.value = chain_name;
    this.chain_name = chain_name;
    this.storageService.setState({ chain_name });
    this.deployerService.setState({ chain_name });
  }

  private selectChainNameOption(chainName: string, apply = true) {
    const select = this.chainNameSelectElt.nativeElement as HTMLSelectElement;
    if (!chainName) {
      return;
    }
    const matched = Array.prototype.slice
      .call(select.options)
      .some((option: HTMLOptionElement, index: number) => {
        if (chainName !== option.value) {
          return false;
        }
        select.selectedIndex = index;
        return true;
      });
    if (apply) {
      this.setChainName(chainName);
    } else if (!matched) {
      select.selectedIndex = -1;
    }
  }
}
