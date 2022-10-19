import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ENV_CONFIG, config } from '@casper-deployer/config';

import { DeployerService } from './deployer.service';

describe('DeployerService', () => {
  let service: DeployerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        DeployerService,
        {
          provide: ENV_CONFIG, useValue: config
        },
      ]
    });
    service = TestBed.inject(DeployerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
