import { Inject, Injectable } from '@angular/core';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { Toaster, TOASTER_TOKEN } from '@casper-util/toaster';
import { SDK_TOKEN } from '@casper-util/wasm';
import { SDK, EventParseResult, DeploySubscription } from 'casper-sdk';


@Injectable({
  providedIn: null
})
export class WatcherService {

  private readonly api_url = 'api_url';

  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster,
    @Inject(SDK_TOKEN) private readonly sdk: SDK
  ) { }

  async watchDeploy(deployHash: string, apiUrl?: string) {
    const config = this.config;
    apiUrl = apiUrl?.replace(config['rpc_port'], config['sse_port']);
    let eventsUrl = apiUrl?.includes(config['localhost']) ? config['eventsUrl_localhost'] : '';
    eventsUrl += apiUrl?.includes(config['localhost']) ?
      config['events_main_suffix'] :
      [
        config['api_prefix'].slice(0, -1),
        config['events_main_suffix'],
        '?',
        this.api_url,
        '=', apiUrl,
      ].join('');


    const watcher = this.sdk.watchDeploy(eventsUrl || config['eventsUrl_default']);
    try {
      const eventHandlerFn = this.getEventHandlerFn(deployHash);
      const deploySubscription: DeploySubscription = new DeploySubscription(deployHash, eventHandlerFn);
      watcher.subscribe([deploySubscription]);
      this.toastr.info(`
      <b>Hash:</b>
      ${deployHash}
      <br><b>Waiting for process...</b>`, 'Deploy accepted!');
      watcher.start();
    }
    catch (err) {
      watcher.stop();
      watcher.unsubscribe(deployHash);
      console.error(err);
    }
  }

  private getEventHandlerFn(deployHash: string) {
    const eventHandlerFn = (eventParseResult: EventParseResult) => {
      if (eventParseResult.err) {
        this.toastr.error(`${deployHash} ${eventParseResult.err}`, '<b>Deploy not successful!</b>');
        console.error(eventParseResult);
      }
      else if (eventParseResult.body?.DeployProcessed?.execution_result.Success) {
        // console.warn(eventParseResult.body.DeployProcessed);
        this.toastr.clear();
        this.toastr.success(`
        <b>Hash:</b>
        ${deployHash}
        <br><b>Block:</b>
        ${eventParseResult.body?.DeployProcessed?.block_hash}
        <br><b>Cost:</b> ${eventParseResult.body?.DeployProcessed?.execution_result.Success.cost} motes`, 'Deploy successful!');
      }
      else {
        //   console.warn(eventParseResult.body.DeployProcessed);
        this.toastr.warning(`<b>Hash:</b>
        ${deployHash}
        <br><b>Block:</b>
        ${eventParseResult.body?.DeployProcessed?.block_hash}
        <br><b>Error:</b> "<b>${eventParseResult.body?.DeployProcessed?.execution_result.Failure?.error_message}"</b>`, '<b>Deploy warning!<b>');
      }
    };
    return eventHandlerFn;
  }

}
