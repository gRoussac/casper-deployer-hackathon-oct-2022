import { Component, Input, OnInit } from '@angular/core';

import { Users } from '@casper-api/api-interfaces';

@Component({
  selector: 'casper-escrow-postman',
  standalone: true,
  imports: [],
  templateUrl: './postman.component.html',
  styleUrls: ['./postman.component.scss'],
})
export class PostmanComponent implements OnInit {
  @Input() users!: Users;
  constructor() { }

  ngOnInit(): void { }
}
