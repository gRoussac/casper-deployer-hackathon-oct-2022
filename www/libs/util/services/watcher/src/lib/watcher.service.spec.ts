import { TestBed } from '@angular/core/testing';

import { WatcherService } from './watcher.service';

describe('WatcherService', () => {
  let service: WatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
