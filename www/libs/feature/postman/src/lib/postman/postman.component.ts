import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Users } from '@casper-escrow/api-interfaces';

@Component({
  selector: 'casper-escrow-postman',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postman.component.html',
  styleUrls: ['./postman.component.scss'],
})
export class PostmanComponent implements OnInit {
  @Input() users!: Users;
  constructor() { }

  ngOnInit(): void { }
}
