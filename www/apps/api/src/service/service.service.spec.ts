import { Test, TestingModule } from '@nestjs/testing';
import { CasperServiceByJsonRPC } from 'casper-js-sdk';
import { UrlService } from '../util/url/url.service';
import { ServiceService } from './service.service';

describe('ServiceService', () => {
  let service: ServiceService;
  const test = 'test', apiUrl = 'http://127.0.0.0.1',
    shortUrl = jest.fn().mockReturnValue(apiUrl),
    isValidHttpUrl = jest.fn().mockReturnValue(true);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceService,
        {
          provide: UrlService, useValue: {
            shortUrl,
            isValidHttpUrl
          }
        }],
    }).compile();

    service = module.get<ServiceService>(ServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should getService without apiUrl param and cache it', () => {
    shortUrl.mockClear();
    isValidHttpUrl.mockClear();
    let client = service.getService('');
    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(CasperServiceByJsonRPC);
    expect(shortUrl).toHaveBeenNthCalledWith(1, '');
    expect(isValidHttpUrl).toHaveBeenNthCalledWith(1, apiUrl);
    client = service.getService('');
    expect(client).toBeInstanceOf(CasperServiceByJsonRPC);
    expect(shortUrl).toHaveBeenNthCalledWith(1, '');
    expect(isValidHttpUrl).toHaveBeenNthCalledWith(1, apiUrl);
  });


  it('should getService with apiUrl param  and cache it', () => {
    shortUrl.mockClear();
    isValidHttpUrl.mockClear();
    let client = service.getService(apiUrl);
    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(CasperServiceByJsonRPC);
    expect(shortUrl).toHaveBeenNthCalledWith(1, apiUrl);
    expect(isValidHttpUrl).toHaveBeenNthCalledWith(1, apiUrl);
    client = service.getService(apiUrl);
    expect(client).toBeInstanceOf(CasperServiceByJsonRPC);
    expect(shortUrl).toHaveBeenNthCalledWith(1, apiUrl);
    expect(isValidHttpUrl).toHaveBeenNthCalledWith(1, apiUrl);
  });

  it('should throw if invalid short url', () => {
    shortUrl.mockReturnValue('');
    expect(() => service.getService(test)).toThrow(TypeError);
    expect(() => service.getService(test)).toThrow('url seems invalid');
    shortUrl.mockReturnValue(undefined);
    expect(() => service.getService(test)).toThrow(TypeError);
    expect(() => service.getService(test)).toThrow('url seems invalid');
    shortUrl.mockReturnValue(apiUrl);
    isValidHttpUrl.mockReturnValue(false);
    expect(() => service.getService(test)).toThrow(TypeError);
    expect(() => service.getService(test)).toThrow('url seems invalid');
    shortUrl.mockReturnValue(false);
    isValidHttpUrl.mockReturnValue(false);
    expect(() => service.getService(test)).toThrow(TypeError);
    expect(() => service.getService(test)).toThrow('url seems invalid');
  });
});
