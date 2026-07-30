import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'casper-escrow-buyer',
  standalone: true,
  imports: [],
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyerComponent {

  send() {

  }
}
