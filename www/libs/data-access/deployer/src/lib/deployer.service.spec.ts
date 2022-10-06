import { TestBed } from '@angular/core/testing';

import { DeployerService } from './deployer.service';

describe('DeployerService', () => {
  let service: DeployerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeployerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
