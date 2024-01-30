import { Test } from '@nestjs/testing';
import { UrlService } from '../util/url/url.service';
import { environment } from '../environments/environment';
import { AppService } from './app.service';
import { Peer } from '@casper-api/api-interfaces';
import { SDKService } from '../sdk/sdk.service';

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
  const getPeersResult = {
    api_version,
    peers
  };
  const getStatusResult = {
    api_version,
    peers: undefined
  };
  const getPeers = jest.fn().mockResolvedValue(getPeersResult);
  const getStateRootHash = jest.fn().mockResolvedValue(test);
  const getStatus = jest.fn().mockResolvedValue(getStatusResult);

  const getCasperSDK = jest.fn().mockReturnValue({
    get_peers: getPeers,
    get_state_root_hash: getStateRootHash,
    get_node_status: getStatus
  });

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        UrlService,
        {
          provide: SDKService, useValue: {
            getCasperSDK
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
      getCasperSDK.mockClear();
      const expectedPeers = [{
        address: `http://${address}:7777`, node_id
      }];
      expect(await service.getPeers(url)).toEqual<Peer[]>(expectedPeers);
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, url);
      expect(getPeers).toHaveBeenNthCalledWith(1);
    });

    it('should return StateRootHash', async () => {
      getCasperSDK.mockClear();
      const expectedStateRootHash = test;
      expect(await service.getStateRootHash(url)).toEqual<string>(expectedStateRootHash);
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, url);
      expect(getStateRootHash).toHaveBeenNthCalledWith(1);
      getCasperSDK.mockClear();
      expect(await service.getStateRootHash('')).toEqual<string>(expectedStateRootHash);
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStateRootHash).toHaveBeenCalledTimes(2);
      getCasperSDK.mockClear();
      const stringify = true;
      expect(await service.getStateRootHash(url, stringify)).toEqual<string>(JSON.stringify(expectedStateRootHash));
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, url);
      expect(getStateRootHash).toHaveBeenCalledTimes(3);
      getCasperSDK.mockClear();
      expect(await service.getStateRootHash('', stringify)).toEqual<string>(JSON.stringify(expectedStateRootHash));
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStateRootHash).toHaveBeenCalledTimes(4);
    });

    it('should return Status', async () => {
      getCasperSDK.mockClear();
      const expectedStatus = status;
      expect(await service.getStatus(url)).toEqual<string>(JSON.stringify(expectedStatus));
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, url);
      expect(getStatus).toHaveBeenNthCalledWith(1);
      getCasperSDK.mockClear();
      expect(await service.getStatus(undefined)).toEqual<string>(JSON.stringify(expectedStatus));
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, undefined);
      expect(getStatus).toHaveBeenNthCalledWith(1);
      getCasperSDK.mockClear();
      expect(await service.getStatus('')).toEqual<string>(JSON.stringify(expectedStatus));
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStatus).toHaveBeenNthCalledWith(1);
      getCasperSDK.mockClear();
      let expectedResult = '';
      getStatus.mockResolvedValueOnce({
        api_version: expectedResult,
      });
      expect(await service.getStatus('')).toEqual<string>(JSON.stringify(expectedResult));
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStatus).toHaveBeenNthCalledWith(1);
      expectedResult = undefined;
      getStatus.mockResolvedValueOnce({
        api_version: expectedResult,
      });
      expect(await service.getStatus('')).toEqual<string>(JSON.stringify(expectedResult));
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStatus).toHaveBeenNthCalledWith(1);
    });


  });
});
