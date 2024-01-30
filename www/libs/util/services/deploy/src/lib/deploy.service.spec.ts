import { TestBed } from '@angular/core/testing';

import { DeployService } from './deploy.service';
import { TOASTER_TOKEN } from '@casper-util/toaster';
import { SDK_TOKEN } from '@casper-util/wasm';
import { ENV_CONFIG, config } from '@casper-util/config';

describe('DeployService', () => {
  let service: DeployService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TOASTER_TOKEN, useValue: {},
        },
        {
          provide: SDK_TOKEN, useValue: {},
        },
        {
          provide: ENV_CONFIG, useValue: config
        },
      ],
    });
    service = TestBed.inject(DeployService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
