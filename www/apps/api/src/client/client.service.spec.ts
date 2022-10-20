import { Test, TestingModule } from '@nestjs/testing';
import { CasperClient } from 'casper-js-sdk';
import { UrlService } from '../util/url/url.service';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;
  const test = 'test', apiUrl = 'http://127.0.0.0.1',
    shortUrl = jest.fn().mockReturnValue(apiUrl),
    isValidHttpUrl = jest.fn().mockReturnValue(true);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: UrlService, useValue: {
            shortUrl,
            isValidHttpUrl
          }
        }
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should getClient with empty apiUrl param and cache it', () => {
    shortUrl.mockClear();
    isValidHttpUrl.mockClear();
    let client = service.getClient('');
    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(CasperClient);
    expect(shortUrl).toHaveBeenNthCalledWith(1, '');
    expect(isValidHttpUrl).toHaveBeenNthCalledWith(1, apiUrl);
    client = service.getClient('');
    expect(client).toBeInstanceOf(CasperClient);
    expect(shortUrl).toHaveBeenNthCalledWith(1, '');
    expect(isValidHttpUrl).toHaveBeenNthCalledWith(1, apiUrl);
  });

  it('should getClient with apiUrl param  and cache it', () => {
    shortUrl.mockClear();
    isValidHttpUrl.mockClear();
    let client = service.getClient(apiUrl);
    expect(client).toBeDefined();
    expect(client).toBeInstanceOf(CasperClient);
    expect(shortUrl).toHaveBeenNthCalledWith(1, apiUrl);
    expect(isValidHttpUrl).toHaveBeenNthCalledWith(1, apiUrl);
    client = service.getClient(apiUrl);
    expect(client).toBeInstanceOf(CasperClient);
    expect(shortUrl).toHaveBeenNthCalledWith(1, apiUrl);
    expect(isValidHttpUrl).toHaveBeenNthCalledWith(1, apiUrl);
  });

  it('should throw if invalid short url', () => {
    shortUrl.mockReturnValue('');
    expect(() => service.getClient(test)).toThrow(TypeError);
    expect(() => service.getClient(test)).toThrow('url seems invalid');
    shortUrl.mockReturnValue(undefined);
    expect(() => service.getClient(test)).toThrow(TypeError);
    expect(() => service.getClient(test)).toThrow('url seems invalid');
    shortUrl.mockReturnValue(apiUrl);
    isValidHttpUrl.mockReturnValue(false);
    expect(() => service.getClient(test)).toThrow(TypeError);
    expect(() => service.getClient(test)).toThrow('url seems invalid');
    shortUrl.mockReturnValue(false);
    isValidHttpUrl.mockReturnValue(false);
    expect(() => service.getClient(test)).toThrow(TypeError);
    expect(() => service.getClient(test)).toThrow('url seems invalid');
  });

});
