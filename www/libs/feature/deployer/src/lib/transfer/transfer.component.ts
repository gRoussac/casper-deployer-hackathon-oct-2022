import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

import { ResultService } from '../result/result.service';
import { State, TransactionReturn } from '@casper-api/api-interfaces';
import { Subscription } from 'rxjs';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { WatcherService } from '@casper-util/watcher';
import { Transaction, motesToCSPR } from 'casper-rust-wasm-sdk';
import { DeployService } from '@casper-util/deploy';
import { TOASTER_TOKEN, Toaster } from '@casper-util/toaster';
import { StorageService } from '@casper-util/storage';
import { WalletService } from '@casper-util/wallet';
import { DeployerService } from '@casper-data/data-access-deployer';

@Component({
  selector: 'casper-deployer-transfer',
  standalone: true,
  imports: [],
  providers: [WatcherService, DeployService],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferComponent implements AfterViewInit, OnDestroy {
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('amountElt') amountElt!: ElementRef;
  @ViewChild('transferToElt') transferToElt!: ElementRef;
  @ViewChild('transferFromElt') transferFromElt!: ElementRef;

  activePublicKey?: string;
  apiUrl?: string;

  private getStateSubscription!: Subscription;
  private transaction?: Transaction;
  private chain_name?: string;

  constructor(
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster,
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly watcherService: WatcherService,
    private readonly deployService: DeployService,
    private readonly storageService: StorageService,
    private readonly walletService: WalletService,
  ) {}

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService
      .getState()
      .subscribe((state: State) => {
        if (state.user?.activePublicKey) {
          this.activePublicKey = state.user.activePublicKey;
        }
        state.apiUrl && (this.apiUrl = state.apiUrl);
        state.chain_name && (this.chain_name = state.chain_name);
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
  }

  async transfer() {
    if (!this.activePublicKey) {
      this.connect.emit();
      return;
    }
    const amount = this.amountElt?.nativeElement.value.trim();
    const initiator_addr =
      this.transferFromElt?.nativeElement.value.trim() || this.activePublicKey;
    const target_account =
      this.transferToElt?.nativeElement.value.trim() || this.activePublicKey!;

    this.transaction = this.deployService.makeTransferTransaction(
      {
        chain_name: this.chain_name || this.config['chain_name_localhost'],
        initiator_addr: initiator_addr!,
      },
      target_account,
      amount,
    );

    const signedTransaction =
      this.transaction &&
      (await this.walletService.signTransaction(
        this.transaction,
        this.activePublicKey,
      ));

    if (signedTransaction && !signedTransaction.verify()) {
      this.toastr.warning(
        signedTransaction.toString(),
        'Transaction verify warning',
      );
      console.warn(this.transaction);
    }
    const transaction = signedTransaction!.toJson();
    if (!transaction) {
      this.toastr.error('', 'Error with validateTransaction');
      console.error(signedTransaction);
      return;
    }
    this.deployerService
      .putTransaction(JSON.stringify(transaction), this.apiUrl)
      .subscribe((result) => {
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

  get isButtonDisabled() {
    return (
      !this.transferToElt?.nativeElement.value ||
      !this.amountElt?.nativeElement.value
    );
  }

  convert() {
    const amount = this.amountElt?.nativeElement.value.trim();
    if (!amount) {
      return;
    }
    return motesToCSPR(amount);
  }
}
