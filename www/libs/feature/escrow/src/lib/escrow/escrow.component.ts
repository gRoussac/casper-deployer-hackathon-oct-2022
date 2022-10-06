import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'casper-escrow-escrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escrow.component.html',
  styleUrls: ['./escrow.component.scss'],
})
export class EscrowComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
