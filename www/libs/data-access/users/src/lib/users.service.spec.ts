import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ENV_CONFIG, config } from '@casper-util/config';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UsersService,
        {
          provide: ENV_CONFIG, useValue: config
        },
      ]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
