import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateRootHashComponent } from '../state-root-hash/state-root-hash.component';
import { QueryGlobalStateComponent } from '../query-global-state/query-global-state.component';
import { GetDeployComponent } from '../get-deploy/get-deploy.component';
import { PutDeployComponent } from '../put-deploy/put-deploy.component';
import { PublicKeyComponent } from '../public-key/public-key.component';
import { BalanceComponent } from '../balance/balance.component';
import { ResultComponent } from '../result/result.component';
import { ResultService } from '../result/result.service';
import { UtilHihlightWebworkerModule } from '@casper-escrow/util-hightlight-webworker';
import { DeployerService } from '@casper-escrow/data-access-deployer';
import { TransferComponent } from '../transfer/transfer.component';
import { DictionaryComponent } from '../dictionary/dictionary.component';

@Component({
  selector: 'casper-deployer',
  standalone: true,
  imports: [
    CommonModule,
    UtilHihlightWebworkerModule,
    StateRootHashComponent,
    PublicKeyComponent,
    TransferComponent,
    BalanceComponent,
    QueryGlobalStateComponent,
    GetDeployComponent,
    PutDeployComponent,
    ResultComponent,
    DictionaryComponent
  ],
  providers: [ResultService],
  templateUrl: './deployer.component.html',
  styleUrls: ['./deployer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeployerComponent {
  @Input() set activePublicKey(activePublicKey: string) {
    this.deployerService.setState({
      activePublicKey
    });
  };
  @Output() connect: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshPurse: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly deployerService: DeployerService
  ) { }
}
