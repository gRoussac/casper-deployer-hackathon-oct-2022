import { Component, Input } from '@angular/core';

import { Users } from '@casper-api/api-interfaces';

@Component({
  selector: 'casper-escrow',
  standalone: true,
  imports: [],
  templateUrl: './escrow.component.html',
  styleUrls: ['./escrow.component.scss'],
})
export class EscrowComponent {
  @Input() users!: Users;
}
