import { Inject, Injectable } from '@angular/core';
import { EnvironmentConfig, ENV_CONFIG } from '@casper-util/config';
import { Toaster, TOASTER_TOKEN } from '@casper-util/toaster';
import { DeploySubscription, DeployWatcher, EventParseResult } from 'casper-js-sdk';

@Injectable({
  providedIn: null
})
export class WatcherService {

  constructor(
    @Inject(ENV_CONFIG) public readonly config: EnvironmentConfig,
    @Inject(TOASTER_TOKEN) private readonly toastr: Toaster) { }
  watchDeploy(deployHash: string, apiUrl?: string) {
    try {
      console.log(apiUrl);
      let eventsUrl = apiUrl?.includes(this.config['localhost']) ? this.config['eventsUrl_localhost'] : apiUrl;
      console.log(eventsUrl);
      eventsUrl = eventsUrl?.replace(this.config['api_suffix'], '');
      eventsUrl += this.config['events_main_suffix'];
      console.log(eventsUrl);
      const watcher = new DeployWatcher(eventsUrl || this.config['eventsUrl_default']);
      const eventHandlerFn = (eventParseResult: EventParseResult) => {
        watcher.stop();
        watcher.unsubscribe(deployHash);
        if (eventParseResult.err) {
          this.toastr.error(`${deployHash} ${eventParseResult.err}`, '<b>Deploy not successful!</b>');
          console.error(eventParseResult);
        } else if (eventParseResult.body.DeployProcessed.execution_result.Success) {
          console.warn(eventParseResult.body.DeployProcessed);
          this.toastr.clear();
          this.toastr.success(`
          <b>Hash:</b>
          ${deployHash}
          <br><b>Block:</b>
          ${eventParseResult.body.DeployProcessed.block_hash}
          <br><b>Cost:</b> ${eventParseResult.body.DeployProcessed.execution_result.Success.cost} motes`, 'Deploy successful!');
        } else {
          console.warn(eventParseResult.body.DeployProcessed);
          this.toastr.warning(`<b>Hash:</b>
          ${deployHash}
          <br><b>Block:</b>
          ${eventParseResult.body.DeployProcessed.block_hash}
          <br><b>Error:</b> "<b>${eventParseResult.body.DeployProcessed.execution_result.Failure.error_message}"</b>`, '<b>Deploy warning!<b>');
        }
      };
      const deploySubscription: DeploySubscription = {
        deployHash,
        eventHandlerFn
      };
      watcher.subscribe([deploySubscription]);
      this.toastr.info(`
      <b>Hash:</b>
      ${deployHash}
      <br><b>Waiting process...</b>`, 'Deploy accepted!');
      watcher.start();
    }
    catch (err) {
      console.error(err);
    }
  }
}
