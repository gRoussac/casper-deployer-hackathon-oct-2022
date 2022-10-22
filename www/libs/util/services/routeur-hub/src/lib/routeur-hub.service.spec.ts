import { TestBed } from '@angular/core/testing';

import { RouteurHubService } from './routeur-hub.service';

describe('RouteurHubService', () => {
  let service: RouteurHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteurHubService]
    });
    service = TestBed.inject(RouteurHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should connect', () => {
    expect(service).toBeTruthy();
  });

  xit('should refreshPurse', () => {
    expect(service).toBeTruthy();
  });

  xit('should setState', () => {
    expect(service).toBeTruthy();
  });

  xit('should getState', () => {
    expect(service).toBeTruthy();
  });
});
