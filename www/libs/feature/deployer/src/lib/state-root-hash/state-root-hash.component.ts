import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Peer } from '@casper-api/api-interfaces';
import { DeployerService } from '@casper-data/data-access-deployer';
import { Subscription } from 'rxjs';
import { ResultService } from '../result/result.service';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';

@Component({
  selector: 'casper-deployer-state-root-hash',
  standalone: true,
  imports: [CommonModule],
  providers: [ResultService],
  templateUrl: './state-root-hash.component.html',
  styleUrls: ['./state-root-hash.component.scss'],
})
export class StateRootHashComponent implements OnDestroy, AfterViewInit {
  stateRootHash!: string;
  private getStateRootHashSubscription!: Subscription;
  private getPeersSubscription!: Subscription;
  private getStatusSubscription!: Subscription;
  peers!: Peer[];
  status = '';
  loaded!: boolean;
  @ViewChild('apiUrlElt') apiUrlElt!: ElementRef;
  @ViewChild('apiSuffixElt') apiSuffixElt!: ElementRef;

  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit(): void {
    this.setPeersSubscription();
  }

  ngOnDestroy(): void {
    this.getStateRootHashSubscription && this.getStateRootHashSubscription.unsubscribe();
    this.getPeersSubscription && this.getPeersSubscription.unsubscribe();
    this.getStatusSubscription && this.getStatusSubscription.unsubscribe();
  }

  setPeersSubscription(): void {
    this.apiUrl && (this.getPeersSubscription = this.deployerService.getPeers(this.apiUrl).subscribe(peersResult => {
      this.peers = peersResult as Peer[];
      this.getStatus();
      this.getStateRootHash();
      this.loaded = true;
      this.getPeersSubscription.unsubscribe();
      this.changeDetectorRef.markForCheck();
    }));
  }

  selectApiUrl(event: Event): void {
    this.apiUrlElt.nativeElement.value = (event.target as HTMLInputElement).value;
  }

  get apiUrl(): string {
    const suffix = this.apiSuffixElt?.nativeElement.value || this.config['api_suffix'];
    const apiUrl = this.apiUrlElt?.nativeElement.value &&
      (this.apiUrlElt.nativeElement.value + suffix);
    let url: URL;
    try {
      url = new URL(apiUrl || this.config['apiUrl_default']);
      return url.origin + url.pathname;
    } catch (error) {
      console.error(error);
    }
    return '';
  }

  getStateRootHash(): void {
    this.getStateRootHashSubscription = this.deployerService.getStateRootHash(this.apiUrl).subscribe(stateRootHash => {
      stateRootHash && this.resultService.setResult<string>('State root hash', stateRootHash);
      this.getStateRootHashSubscription.unsubscribe();
    });
  }

  getStatus(): void {
    this.status = '';
    this.apiUrl && (this.getStatusSubscription = this.deployerService.getStatus(this.apiUrl).subscribe(status => {
      this.status = status;
      this.changeDetectorRef.markForCheck();
      this.getStatusSubscription.unsubscribe();
    }));
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

  trackByFn = (index: number, item: Peer): string => {
    return item.node_id;
  };
}
