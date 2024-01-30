import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from '../util/url/url.service';
import { SDKService } from './sdk.service';

describe('SDKService', () => {
  let service: SDKService;
  const apiUrl = 'http://127.0.0.0.1',
    shortUrl = jest.fn().mockReturnValue(apiUrl),
    isValidHttpUrl = jest.fn().mockReturnValue(true);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SDKService,
        {
          provide: UrlService, useValue: {
            shortUrl,
            isValidHttpUrl
          }
        }
      ],
    }).compile();

    service = module.get<SDKService>(SDKService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
