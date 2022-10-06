import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'casper-escrow-buyer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.scss'],
})
export class BuyerComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
