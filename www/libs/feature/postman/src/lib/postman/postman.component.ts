import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'casper-escrow-postman',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postman.component.html',
  styleUrls: ['./postman.component.scss'],
})
export class PostmanComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
