import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'casper-escrow-buyer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyerComponent {

  send() {

  }
}
