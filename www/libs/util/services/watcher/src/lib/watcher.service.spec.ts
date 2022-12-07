import { TestBed } from '@angular/core/testing';
import { config, ENV_CONFIG } from '@casper-util/config';
import { TOASTER_TOKEN } from '@casper-util/toaster';

import { WatcherService } from './watcher.service';

describe('WatcherService', () => {
  let service: WatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WatcherService,
        {
          provide: TOASTER_TOKEN, useValue: {},
        },
        {
          provide: ENV_CONFIG, useValue: config
        },
      ]
    });
    service = TestBed.inject(WatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
