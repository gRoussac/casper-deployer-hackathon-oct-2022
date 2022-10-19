import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '@casper-escrow/api-interfaces';
import { DeployerService } from '@casper-escrow/data-access-deployer';
import { Subscription } from 'rxjs';
import { ResultService } from '../result/result.service';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-deployer/config';

@Component({
  selector: 'casper-deployer-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent implements AfterViewInit, OnDestroy {
  apiUrl?: string;
  stateRootHash?: string;
  status?= '';
  purse_uref!: string;
  balanceFromURef!: string;
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('purseURefElt') purseURefElt!: ElementRef;

  private getStateSubscription!: Subscription;
  private getBalanceSubscription!: Subscription;

  constructor(
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
  ) { }

  ngAfterViewInit(): void {
    this.getStateSubscription = this.deployerService.getState().subscribe((state: State) => {
      state.stateRootHash && (this.stateRootHash = state.stateRootHash);
      state.apiUrl && (this.apiUrl = state.apiUrl);
      if (state.status !== undefined) {
        this.status = state.status;
      }
      this.changeDetectorRef.markForCheck();
    });
  };

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
    this.getBalanceSubscription && this.getBalanceSubscription.unsubscribe();
  }

  getBalance() {
    const purseURef = this.purseURefElt.nativeElement.value;
    purseURef && this.stateRootHash && (this.getBalanceSubscription = this.deployerService.getBalance(
      this.stateRootHash,
      purseURef,
      this.apiUrl
    ).subscribe(balanceFromURef => {
      balanceFromURef && this.resultService.setResult<string>('Balance', balanceFromURef);
      this.getBalanceSubscription.unsubscribe();
    }));
  }

  get isBalanceButtonDisabled() {
    return !this.stateRootHash ||
      !this.purseURefElt?.nativeElement.value;
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

}

