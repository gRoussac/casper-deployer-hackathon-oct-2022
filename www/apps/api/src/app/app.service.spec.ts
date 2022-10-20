import { Test } from '@nestjs/testing';
import { ClientService } from '../client/client.service';
import { ServiceService } from '../service/service.service';
import { UrlService } from '../util/url/url.service';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import { GetPeersResult } from 'casper-js-sdk';
import { Peer } from '@casper-api/api-interfaces';

describe('AppService', () => {
  let service: AppService;

  const test = 'test';
  const url = test;
  const address = '127.0.0.1';
  const node_id = test;
  const api_version = test;
  const status = 'status';
  const peers: Peer[] = [{
    address,
    node_id
  }];
  const getPeersResult: GetPeersResult = {
    api_version,
    peers
  };
  const getStatusResult: GetPeersResult = {
    api_version,
    peers: undefined
  };
  const getPeers = jest.fn().mockResolvedValue(getPeersResult);
  const getStateRootHash = jest.fn().mockResolvedValue(test);
  const getStatus = jest.fn().mockResolvedValue(getStatusResult);

  const getService = jest.fn().mockReturnValue({
    getPeers,
    getStateRootHash,
    getStatus
  });

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        ClientService,
        UrlService,
        {
          provide: ServiceService, useValue: {
            getService
          }
        }
      ],
    }).compile();
    service = app.get<AppService>(AppService);
  });

  describe('AppService Methods', () => {
    it('should return users', () => {
      expect(service.getUsers()).toStrictEqual(environment.users);
    });

    it('should return network peers', async () => {
      getService.mockClear();
      const expectedPeers = [{
        address: `http://${address}:7777`, node_id
      }];
      expect(await service.getPeers(url)).toEqual<Peer[]>(expectedPeers);
      expect(getService).toHaveBeenNthCalledWith(1, url);
      expect(getPeers).toHaveBeenNthCalledWith(1);
    });

    it('should return StateRootHash', async () => {
      getService.mockClear();
      const expectedStateRootHash = test;
      expect(await service.getStateRootHash(url)).toEqual<string>(expectedStateRootHash);
      expect(getService).toHaveBeenNthCalledWith(1, url);
      expect(getStateRootHash).toHaveBeenNthCalledWith(1);
      getService.mockClear();
      expect(await service.getStateRootHash('')).toEqual<string>(expectedStateRootHash);
      expect(getService).toHaveBeenNthCalledWith(1, '');
      expect(getStateRootHash).toHaveBeenCalledTimes(2);
      getService.mockClear();
      const stringify = true;
      expect(await service.getStateRootHash(url, stringify)).toEqual<string>(JSON.stringify(expectedStateRootHash));
      expect(getService).toHaveBeenNthCalledWith(1, url);
      expect(getStateRootHash).toHaveBeenCalledTimes(3);
      getService.mockClear();
      expect(await service.getStateRootHash('', stringify)).toEqual<string>(JSON.stringify(expectedStateRootHash));
      expect(getService).toHaveBeenNthCalledWith(1, '');
      expect(getStateRootHash).toHaveBeenCalledTimes(4);
    });

    it('should return Status', async () => {
      getService.mockClear();
      const expectedStatus = status;
      expect(await service.getStatus(url)).toEqual<string>(JSON.stringify(expectedStatus));
      expect(getService).toHaveBeenNthCalledWith(1, url);
      expect(getStatus).toHaveBeenNthCalledWith(1);
      getService.mockClear();
      expect(await service.getStatus(undefined)).toEqual<string>(JSON.stringify(expectedStatus));
      expect(getService).toHaveBeenNthCalledWith(1, undefined);
      expect(getStatus).toHaveBeenNthCalledWith(1);
      getService.mockClear();
      expect(await service.getStatus('')).toEqual<string>(JSON.stringify(expectedStatus));
      expect(getService).toHaveBeenNthCalledWith(1, '');
      expect(getStatus).toHaveBeenNthCalledWith(1);
      getService.mockClear();
      let expectedResult = '';
      getStatus.mockResolvedValueOnce({
        api_version: expectedResult,
      });
      expect(await service.getStatus('')).toEqual<string>(JSON.stringify(expectedResult));
      expect(getService).toHaveBeenNthCalledWith(1, '');
      expect(getStatus).toHaveBeenNthCalledWith(1);
      expectedResult = undefined;
      getStatus.mockResolvedValueOnce({
        api_version: expectedResult,
      });
      expect(await service.getStatus('')).toEqual<string>(JSON.stringify(expectedResult));
      expect(getService).toHaveBeenNthCalledWith(1, '');
      expect(getStatus).toHaveBeenNthCalledWith(1);
    });


  });
});
