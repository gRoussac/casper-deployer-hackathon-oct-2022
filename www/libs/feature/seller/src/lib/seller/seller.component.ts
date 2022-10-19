import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users } from '@casper-api/api-interfaces';

@Component({
  selector: 'casper-escrow-seller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
  @Input() users!: Users;
  constructor() { }

  ngOnInit(): void { }
}
