import { TestBed } from '@angular/core/testing';

import { RouteurHubService } from './routeur-hub.service';

describe('RouteurHubService', () => {
  let service: RouteurHubService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteurHubService],
    });
    service = TestBed.inject(RouteurHubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
