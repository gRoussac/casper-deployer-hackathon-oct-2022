import { TestBed } from '@angular/core/testing';
import { HighlightService, HIGHLIGHT_WEBWORKER_FACTORY } from '@casper-escrow/util-hightlight-webworker';

import { ResultService } from './result.service';

describe('ResultService', () => {
  let service: ResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResultService,
        HighlightService,
        {
          provide: HIGHLIGHT_WEBWORKER_FACTORY, useValue: {
            HIGHLIGHT_WEBWORKER_FACTORY
          }
        },
      ]
    });
    service = TestBed.inject(ResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
