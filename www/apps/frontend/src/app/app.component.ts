import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

import { CommonModule, DOCUMENT } from '@angular/common';
import { Subscription, map } from 'rxjs';

import { HeaderComponent } from '@casper-ui/header';
import { UsersService } from '@casper-data/data-access-users';
import { Users, User, Roles, Purse } from '@casper-api/api-interfaces';
import { ESCROW_TOKEN } from '@casper-util/wasm';
import { Escrow } from "escrow";
import { CasperLabsHelper } from 'casper-js-sdk/dist/@types/casperlabsSigner';
import { RouterModule } from '@angular/router';
import { RouteurHubService } from '@casper-util/routeur-hub';
import { StorageService } from '@casper-util/storage';

declare global {
  interface Window {
    casperlabsHelper: CasperLabsHelper;
  }
}

const imports = [
  CommonModule,
  RouterModule,
  HeaderComponent
];

@Component({
  selector: 'casper-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports,
  providers: [
    UsersService,
    RouteurHubService,
    StorageService
  ],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  readonly window = this.document.defaultView;
  isConnected!: boolean;
  activePublicKey!: string;
  users!: Users;
  user?: User;
  balance!: string;
  apiUrl!: string;

  readonly Roles = Roles;

  private usersSubscription!: Subscription;
  private accountInformationSubscription!: Subscription;
  subscriptions: Subscription[] = [];

  private _activePublicKey!: string; // memoize activePublicKey

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(ESCROW_TOKEN) private readonly escrow: Escrow,
    private readonly usersService: UsersService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly routeurHubService: RouteurHubService,
    private readonly storageService: StorageService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.setRouteurHubSubscriptions();
    this.setUsersSubscription();
    this.window?.addEventListener('signer:unlocked', async () => await this.refreshData());
    this.window?.addEventListener('signer:activeKeyChanged', async () => await this.refreshData());
    this.escrow.hello();
  }

  ngAfterViewInit() {
    this.apiUrl = this.storageService.get('apiUrl');
    // Bug on the Signer, activePublicKey rejected on first quick load
    setTimeout(async () => {
      await this.refreshData();
    }, 150);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription && subscription.unsubscribe();
    });
  }

  async connect() {
    try {
      this.window?.casperlabsHelper?.requestConnection();
      await this.refreshData();
    } catch (error) { console.error(error); }
  }

  private refreshPurse() {
    this.setAccountInformationSubscription();
  }

  private setRouteurHubSubscriptions() {
    this.subscriptions.push(this.routeurHubService.connect$.subscribe(async () => {
      this.connect();
    }));
    this.subscriptions.push(this.routeurHubService.refreshPurse$.subscribe(async () => {
      this.refreshPurse();
    }));
    this.subscriptions.push(this.routeurHubService.getHubState().subscribe(async (state) => {
      if (state.apiUrl) {
        this.apiUrl = state.apiUrl;
        this.storageService.setState(state);
      }
    }
    ));
  }

  private setUsersSubscription() {
    this.usersSubscription = this.usersService.get().subscribe(users => {
      this.users = users;
      this.changeDetectorRef.markForCheck();
      this.usersSubscription.unsubscribe();
    });
  }

  private async refreshData() {
    await this.setActivePublicKey();
    this.setActiveUser();
    this.setPurse();
  }

  private async setActivePublicKey() {
    const isConnected$ = this.window?.casperlabsHelper?.isConnected(),
      activePublicKey$ = this.window?.casperlabsHelper?.getActivePublicKey();
    const promises = await Promise.allSettled([isConnected$, activePublicKey$])
      .catch(error => console.error(error));
    const results = promises?.filter(
      ({ status }) => status === 'fulfilled'
    ).map(result => (result as PromiseFulfilledResult<string | boolean>).value);
    let isConnected, activePublicKey;
    results && ([isConnected, activePublicKey] = results);
    activePublicKey = activePublicKey as string;
    this.activePublicKey = activePublicKey as string;
    this.isConnected = (this.activePublicKey && isConnected) as boolean;
  }

  private setActiveUser() {
    this.user = this.users?.find((user: User) => user.activePublicKey == this.activePublicKey) as User;
    !this.user && this.activePublicKey && (this.user = { activePublicKey: this.activePublicKey });
    this.routeurHubService.setHubState({ user: this.user });
  }

  private setPurse() {
    if (
      !this.isConnected ||
      !this.activePublicKey ||
      // Do not retrieve activePublicKey if it has not changed
      this._activePublicKey === this.activePublicKey
    ) {
      return;
    }
    // memoize activePublicKey
    this._activePublicKey = this.activePublicKey;
    this.setAccountInformationSubscription();
  }

  private setAccountInformationSubscription() {
    this.activePublicKey && (this.accountInformationSubscription = this.usersService.getPurse(this.activePublicKey, this.apiUrl)
      .pipe(
        map((purse: Purse | Error) =>
          purse as Purse
        )
      ).subscribe(
        (purse => {
          this.balance = this.getBalance(purse);
          this.changeDetectorRef.markForCheck();
          this.accountInformationSubscription.unsubscribe();
        })
      ));
  }

  private getBalance(purse: Purse) {
    if (!purse?.balance) {
      return BigInt(0).toLocaleString();
    }
    // TODO Fix with motesToCSPR
    return (BigInt(purse.balance) / BigInt(1e+10)).toLocaleString();
  }

}
