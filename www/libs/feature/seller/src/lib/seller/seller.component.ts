import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'casper-escrow-seller',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss'],
})
export class SellerComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
