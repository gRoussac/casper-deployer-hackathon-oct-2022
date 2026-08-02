import { Inject, Injectable, isDevMode } from '@angular/core';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { Toaster, TOASTER_TOKEN } from '@casper-util/toaster';
import { SDK_TOKEN } from '@casper-util/wasm';
import {
  SDK,
  EventParseResult,
  Subscription,
  TransactionProcessed,
} from 'casper-rust-wasm-sdk';

@Injectable()
export class WatcherService {
  private readonly events = 'events';
  private readonly api_url = 'api_url';

  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster,
    @Inject(SDK_TOKEN) private readonly sdk: SDK,
  ) {}

  async watchTransaction(transactionHash: string, apiUrl?: string) {
    const sseTarget = this.toSseTarget(apiUrl);
    const proxyBase =
      (!isDevMode() && this.config['events_url_default']) ||
      this.config['events_url_default'];
    const eventsUrl = [
      proxyBase.replace(/\/$/, ''),
      `?${this.api_url}=`,
      encodeURIComponent(sseTarget),
    ].join('');

    const watcher = this.sdk.watchTransaction(eventsUrl);
    try {
      const eventHandlerFn = this.getEventHandlerFn(transactionHash);
      const subscription: Subscription = new Subscription(
        transactionHash,
        eventHandlerFn,
      );
      watcher.subscribe([subscription]);
      this.toastr.info(
        `
      <b>Hash:</b>
      ${transactionHash}
      <br><b>Waiting for process...</b>`,
        'Transaction accepted!',
      );
      await watcher.start();
    } catch (err) {
      watcher.stop();
      watcher.unsubscribe(transactionHash);
      console.error(err);
    }
  }

  /** @deprecated Use watchTransaction */
  async watchDeploy(deployHash: string, apiUrl?: string) {
    return this.watchTransaction(deployHash, apiUrl);
  }

  /**
   * Map JSON-RPC apiUrl → SSE event stream URL (Casper 2 / NCTL 2).
   * NCTL: 11101-11105 → 18101-18105 (+7000). No legacy 7777/9999.
   */
  private toSseTarget(apiUrl?: string): string {
    const eventsSuffix = this.config['events_suffix'] || '/events';
    if (!apiUrl) {
      return (
        this.config['events_url_localhost'] ||
        `http://localhost:18101${eventsSuffix}`
      );
    }

    try {
      const url = new URL(apiUrl.includes('://') ? apiUrl : `http://${apiUrl}`);
      if (url.hostname.includes('testnet.casper.network')) {
        return `https://node.testnet.casper.network${eventsSuffix}`;
      }
      if (url.hostname.includes('mainnet.casper.network')) {
        return `https://node.mainnet.casper.network${eventsSuffix}`;
      }

      const rpcPort = parseInt(url.port || '11101', 10);
      if (rpcPort >= 11101 && rpcPort <= 11105) {
        const ssePort =
          rpcPort + parseInt(this.config['nctl_sse_offset'] || '7000', 10);
        return `http://${url.hostname}:${ssePort}${eventsSuffix}`;
      }

      if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
        return `http://${url.hostname}:${this.config['sse_port_localhost'] || '18101'}${eventsSuffix}`;
      }

      // Custom node: same origin path /events
      return `${url.protocol}//${url.host}${eventsSuffix}`;
    } catch {
      return (
        this.config['events_url_localhost'] ||
        `http://localhost:18101${eventsSuffix}`
      );
    }
  }

  private getProcessed(
    eventParseResult: EventParseResult,
  ): TransactionProcessed | undefined {
    const body = eventParseResult.body;
    return (
      body?.get_transaction_processed ||
      body?.transaction_processed ||
      body?.get_deploy_processed
    );
  }

  private getEventHandlerFn(transactionHash: string) {
    const eventHandlerFn = (eventParseResult: EventParseResult) => {
      if (eventParseResult.err) {
        this.toastr.error(
          `${transactionHash} ${eventParseResult.err}`,
          '<b>Transaction not successful!</b>',
        );
        console.error(eventParseResult);
        return;
      }

      const processed = this.getProcessed(eventParseResult);
      if (processed?.execution_result?.Success) {
        this.toastr.clear();
        this.toastr.success(
          `
        <b>Hash:</b>
        ${transactionHash}
        <br><b>Block:</b>
        ${processed.block_hash}
        <br><b>Cost:</b> ${processed.execution_result.Success.cost} motes`,
          'Transaction successful!',
        );
      } else {
        this.toastr.warning(
          `<b>Hash:</b>
        ${transactionHash}
        <br><b>Block:</b>
        ${processed?.block_hash}
        <br><b>Error:</b> "<b>${processed?.execution_result?.Failure?.error_message}"</b>`,
          '<b>Transaction warning!<b>',
        );
      }
    };
    return eventHandlerFn;
  }
}
