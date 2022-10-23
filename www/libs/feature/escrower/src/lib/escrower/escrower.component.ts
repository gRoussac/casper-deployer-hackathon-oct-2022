import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteurHubService } from '@casper-util/routeur-hub';
import { Subscription } from 'rxjs';
import { Roles, State } from '@casper-api/api-interfaces';
import { BuyerComponent } from '@casper-escrow/buyer';
import { PostmanComponent } from '@casper-escrow/postman';
import { SellerComponent } from '@casper-escrow/seller';
import { EscrowComponent } from '@casper-escrow/escrow';

@Component({
  selector: 'casper-escrower',
  standalone: true,
  imports: [
    CommonModule,
    BuyerComponent,
    EscrowComponent,
    PostmanComponent,
    SellerComponent
  ],
  templateUrl: './escrower.component.html',
  styleUrls: ['./escrower.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EscrowerComponent implements OnDestroy, AfterViewInit {
  role!: Roles;
  Roles = Roles;

  private routeurHubSubscription!: Subscription;

  constructor(
    private readonly routeurHubService: RouteurHubService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.setRouteurHubSubscription();
  }

  ngOnDestroy() {
    this.routeurHubSubscription && this.routeurHubSubscription.unsubscribe();
  }

  private setRouteurHubSubscription() {

    this.routeurHubSubscription = this.routeurHubService.getHubState().subscribe((state: State) => {
      if (state.user?.role) {
        this.role = state.user.role;
        this.changeDetectorRef.markForCheck();
      }
    });
  }
}
