import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  ViewChild,
  DOCUMENT,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Peer } from '@casper-api/api-interfaces';
import { DeployerService } from '@casper-data/data-access-deployer';
import { Subscription } from 'rxjs';
import { ResultService } from '../result/result.service';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { RouteurHubService } from '@casper-util/routeur-hub';
import { StorageService } from '@casper-util/storage';

@Component({
  selector: 'casper-deployer-state-root-hash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './state-root-hash.component.html',
  styleUrls: ['./state-root-hash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateRootHashComponent implements OnDestroy, AfterViewInit {
  stateRootHash!: string;
  private getStateRootHashSubscription!: Subscription;
  private getPeersSubscription!: Subscription;
  private getStatusSubscription!: Subscription;
  private window!: (Window & typeof globalThis) | null;

  /** RPC used for info_get_peers — never a gossip :35000 peer URL. */
  private peersSourceUrl!: string;

  peers: Peer[] = [];
  status = '';
  apiUrl!: string;
  @ViewChild('apiUrlElt') apiUrlElt!: HTMLInputElement;
  defaults!: string[];

  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(DOCUMENT) private document: Document,
    private readonly deployerService: DeployerService,
    private readonly resultService: ResultService,
    private readonly routeurHubService: RouteurHubService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly storageService: StorageService,
  ) {
    this.window = this.document.defaultView;
    this.defaults = this.buildDefaults();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const apiUrl = this.storageService.get('apiUrl');
      if (apiUrl) {
        this.apiUrl = apiUrl;
        if (
          !this.defaults.includes(this.apiUrl) &&
          !this.isGossipPeerUrl(this.apiUrl)
        ) {
          this.defaults.push(this.apiUrl);
        }
        this.deployerService.setState({ apiUrl });
        this.syncChainName(apiUrl);
      } else {
        const currentHost = this.window?.location.hostname;
        const localhost = this.config['default_node_localhost'];
        if (
          this.isLocalBrowserHost() &&
          currentHost &&
          localhost.includes(currentHost)
        ) {
          this.apiUrl = localhost;
        } else {
          this.apiUrl = this.config['default_node_testnet'];
        }
        this.routeurHubService.setHubState({ apiUrl: this.apiUrl });
        this.deployerService.setState({ apiUrl: this.apiUrl });
        this.syncChainName(this.apiUrl);
      }
      this.peersSourceUrl = this.peersSourceFor(this.apiUrl);
      this.getPeers();
    });
  }

  ngOnDestroy(): void {
    this.getStateRootHashSubscription &&
      this.getStateRootHashSubscription.unsubscribe();
    this.getPeersSubscription && this.getPeersSubscription.unsubscribe();
    this.getStatusSubscription && this.getStatusSubscription.unsubscribe();
  }

  selectApiUrl(event: Event): void {
    let apiUrl = (event.target as HTMLInputElement).value;
    if (!apiUrl) {
      return;
    }
    try {
      const url = new URL(apiUrl);
      apiUrl = (url.origin + url.pathname).replace(/\/$/, '');
    } catch (error) {
      console.error(error);
    }
    this.apiUrl = apiUrl;
    this.apiUrlElt.value = this.apiUrl;
    this.deployerService.setState({ apiUrl: this.apiUrl });
    this.routeurHubService.setHubState({ apiUrl: this.apiUrl });
    this.syncChainName(this.apiUrl);

    // Gossip peers stay in the peers optgroup — do not pollute presets.
    if (
      !this.defaults.includes(this.apiUrl) &&
      !this.isGossipPeerUrl(this.apiUrl)
    ) {
      this.defaults.push(this.apiUrl);
    }

    // Keep peers list tied to a real JSON-RPC endpoint (testnet/mainnet/NCTL).
    const nextPeersSource = this.peersSourceFor(this.apiUrl);
    const peersSourceChanged = nextPeersSource !== this.peersSourceUrl;
    this.peersSourceUrl = nextPeersSource;

    if (peersSourceChanged || !this.peers?.length) {
      this.getPeers();
    } else if (!this.isGossipPeerUrl(this.apiUrl)) {
      this.getStatus();
      this.getStateRootHash();
    } else {
      this.status = '';
      this.changeDetectorRef.markForCheck();
    }
    this.routeurHubService.refreshPurse();
  }

  /** Known presets only; custom URLs keep whatever chain_name the user set. */
  private syncChainName(apiUrl: string) {
    let chain_name: string | undefined;
    if (
      apiUrl.includes(this.config['default_node_localhost']) ||
      /:1110[1-5]\b/.test(apiUrl)
    ) {
      chain_name = this.config['chain_name_localhost'];
    } else if (apiUrl.includes(this.config['default_node_testnet'])) {
      chain_name = this.config['chain_name_testnet'];
    } else if (apiUrl.includes(this.config['default_node_mainnet'])) {
      chain_name = this.config['chain_name_mainnet'];
    }
    if (chain_name) {
      this.storageService.setState({ chain_name });
      this.deployerService.setState({ chain_name });
      this.routeurHubService.setHubState({ chain_name });
    }
  }

  getStateRootHash(): void {
    this.apiUrl &&
      (this.getStateRootHashSubscription = this.deployerService
        .getStateRootHash(this.apiUrl)
        .subscribe((stateRootHash) => {
          stateRootHash &&
            this.resultService.setResult<string>(
              'State root hash',
              stateRootHash,
            );
          this.getStateRootHashSubscription.unsubscribe();
        }));
  }

  getPeers(): void {
    const url = this.peersSourceUrl || this.apiUrl;
    url &&
      (this.getPeersSubscription = this.deployerService
        .getPeers(url)
        .subscribe((peersResult) => {
          this.peers = Array.isArray(peersResult) ? peersResult : [];
          if (!this.isGossipPeerUrl(this.apiUrl)) {
            this.getStatus();
            this.getStateRootHash();
          } else {
            this.status = '';
          }
          this.getPeersSubscription.unsubscribe();
          this.changeDetectorRef.markForCheck();
        }));
  }

  getStatus(): void {
    this.status = '';
    this.apiUrl &&
      (this.getStatusSubscription = this.deployerService
        .getStatus(this.apiUrl)
        .subscribe((status) => {
          this.status = status;
          this.changeDetectorRef.markForCheck();
          this.getStatusSubscription.unsubscribe();
        }));
  }

  copy(value: string): void {
    this.resultService.copyClipboard(value);
  }

  trackByFn = (_index: number, item: Peer): string =>
    `${item.node_id}|${item.address}`;

  /** Local docker/dev stack in the browser — keep localhost preset. */
  private isLocalBrowserHost(): boolean {
    const host = this.window?.location.hostname || '';
    return host === 'localhost' || host === '127.0.0.1';
  }

  /**
   * Hosted sites (e.g. casper-deployer.interchouette.net): omit localhost.
   * Local browser host: include NCTL localhost preset.
   */
  private buildDefaults(): string[] {
    const defaults = [
      this.config['default_node_testnet'],
      this.config['default_node_mainnet'],
    ];
    if (this.isLocalBrowserHost()) {
      defaults.unshift(this.config['default_node_localhost']);
    }
    return defaults;
  }

  /** Casper gossip/network peers from info_get_peers are typically :35000. */
  private isGossipPeerUrl(apiUrl: string): boolean {
    try {
      const url = new URL(
        apiUrl.includes('://') ? apiUrl : `http://${apiUrl}`,
      );
      return url.port === '35000';
    } catch {
      return /:35000(?:\/|$)/.test(apiUrl);
    }
  }

  private peersSourceFor(apiUrl: string): string {
    if (this.isGossipPeerUrl(apiUrl)) {
      return (
        this.peersSourceUrl ||
        this.config['default_node_testnet'] ||
        apiUrl
      );
    }
    return apiUrl;
  }
}
