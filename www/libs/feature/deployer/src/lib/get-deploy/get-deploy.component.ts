import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { DeployerService } from '@casper-data/data-access-deployer';
import { State } from '@casper-api/api-interfaces';
import { ResultService } from '../result/result.service';
import { StorageService } from '@casper-util/storage';
import { GetTransactionResult } from 'casper-rust-wasm-sdk';

@Component({
  selector: 'casper-deployer-get-deploy',
  standalone: true,
  imports: [],
  templateUrl: './get-deploy.component.html',
  styleUrls: ['./get-deploy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetDeployComponent implements OnDestroy, AfterViewInit {
  @Output() refreshPurse: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('getDeployElt') getDeployElt!: ElementRef;
  apiUrl?: string;
  deploy_hash?: string;

  private getStateSubscription!: Subscription;
  private getDeploySubscription!: Subscription;

  constructor(
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly storageService: StorageService,
  ) {}

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
    this.getDeploySubscription && this.getDeploySubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService
      .getState()
      .subscribe((state: State) => {
        if (state.apiUrl) {
          this.apiUrl = state.apiUrl;
        }
        const hash = state.transaction_hash || state.deploy_hash;
        if (hash) {
          this.deploy_hash = hash;
          this.getDeployElt.nativeElement.value = this.deploy_hash;
        }
        this.changeDetectorRef.markForCheck();
      });
    this.deploy_hash =
      this.storageService.get('transaction_hash') ||
      this.storageService.get('deploy_hash');
  }

  getDeploy() {
    const transaction_hash = this.getDeployElt.nativeElement.value
      .replace('deploy-', '')
      .replace('transaction-', '');
    transaction_hash &&
      (this.getDeploySubscription = this.deployerService
        .getTransaction(transaction_hash, this.apiUrl)
        .subscribe((transactionResult) => {
          transactionResult &&
            this.resultService.setResult<GetTransactionResult>(
              'Transaction info',
              transactionResult,
            );
          this.refreshPurse.emit();
          this.getDeploySubscription.unsubscribe();
        }));
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

  get isGetDeployDisabled() {
    return !this.getDeployElt?.nativeElement.value;
  }

  reset() {
    this.getDeployElt.nativeElement.value = '';
    this.storageService.setState({ deploy_hash: '', transaction_hash: '' });
  }

  onDeployChange() {
    const transaction_hash = this.getDeployElt.nativeElement.value;
    transaction_hash &&
      this.storageService.setState({
        transaction_hash,
        deploy_hash: transaction_hash,
      });
  }
}
