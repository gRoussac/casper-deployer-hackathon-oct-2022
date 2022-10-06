import { Component, Inject } from '@angular/core';
import { SellerComponent } from '@casper-escrow/seller';
import { BuyerComponent } from '@casper-escrow/buyer';
import { EscrowComponent } from '@casper-escrow/escrow';
import { PostmanComponent } from '@casper-escrow/postman';
import { DOCUMENT } from '@angular/common';
import { CasperClient, CasperServiceByJsonRPC, CLPublicKey, DeployUtil } from "casper-js-sdk";

@Component({
  selector: 'casper-escrow-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    SellerComponent,
    BuyerComponent,
    EscrowComponent,
    PostmanComponent
  ],
  providers: []
})
export class AppComponent {
  public readonly window = this.document.defaultView;
  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  connect() {
    if (this.window?.casperlabsHelper) {
      this.window.casperlabsHelper.requestConnection();
    }
  }
}
