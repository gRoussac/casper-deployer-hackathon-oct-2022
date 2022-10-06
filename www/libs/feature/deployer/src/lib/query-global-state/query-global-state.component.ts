import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentConfig, State } from '@casper-escrow/api-interfaces';
import { DeployerService } from '@casper-escrow/data-access-deployer';
import { Subscription } from 'rxjs';
import { ENV_CONFIG } from '@casper-escrow/util-tokens';
import { ResultService } from '../result/result.service';
import { StoredValue } from 'casper-js-sdk/dist/lib/StoredValue';

@Component({
  selector: 'casper-deployer-query-global-state',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query-global-state.component.html',
  styleUrls: ['./query-global-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryGlobalStateComponent implements AfterViewInit, OnDestroy {
  apiUrl?: string;
  stateRootHash?: string;
  activePublicKey?: string;
  status?= '';
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('keyElt') keyElt!: ElementRef;
  @ViewChild('pathElt') pathElt!: ElementRef;

  private getStateSubscription!: Subscription;
  private getBlockStateSubscription!: Subscription;

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
      if (state.activePublicKey) {
        this.activePublicKey = state.activePublicKey;
      }
      this.changeDetectorRef.markForCheck();
    });
  };

  ngOnDestroy() {
    this.getStateSubscription && this.getStateSubscription.unsubscribe();
    this.getBlockStateSubscription && this.getBlockStateSubscription.unsubscribe();
  }

  getBlockState() {
    const key = this.keyElt.nativeElement.value;
    const path = this.pathElt.nativeElement.value;
    key && this.stateRootHash && (this.getBlockStateSubscription = this.deployerService.getBlockState(
      this.stateRootHash,
      key,
      path,
      this.apiUrl
    ).subscribe(async storedValue => {
      storedValue && this.resultService.setResult<StoredValue>('Stored Value', storedValue as StoredValue);
      this.getBlockStateSubscription.unsubscribe();
    }));
  }

  get isBlockStateDisabled() {
    return !this.stateRootHash ||
      !this.keyElt?.nativeElement.value;
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

}
