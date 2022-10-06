import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users } from '@casper-escrow/api-interfaces';

@Component({
  selector: 'casper-escrow-escrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escrow.component.html',
  styleUrls: ['./escrow.component.scss'],
})
export class EscrowComponent {
  @Input() users!: Users;
}
