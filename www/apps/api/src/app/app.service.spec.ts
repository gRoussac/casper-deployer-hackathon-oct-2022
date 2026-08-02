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
  const peers: Peer[] = [
    {
      address,
      node_id,
    },
  ];
  const getPeersResult = {
    api_version,
    peers: [{ address: `${address}:34553`, node_id }],
  };
  const getStatusResult = {
    api_version,
    peers: undefined,
  };
  const getPeers = jest.fn().mockResolvedValue(getPeersResult);
  const getStateRootHash = jest.fn().mockResolvedValue(test);
  const getStatus = jest.fn().mockResolvedValue(getStatusResult);
  const put_transaction = jest.fn().mockResolvedValue({
    toJson: () => ({ transaction_hash: 'tx-hash-1' }),
    transaction_hash: { toString: () => 'tx-hash-1' },
  });

  const getCasperSDK = jest.fn().mockReturnValue({
    get_peers: getPeers,
    get_state_root_hash: getStateRootHash,
    get_node_status: getStatus,
    put_transaction,
  });

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        AppService,
        UrlService,
        {
          provide: SDKService,
          useValue: {
            getCasperSDK,
          },
        },
      ],
    }).compile();
    service = app.get<AppService>(AppService);
  });

  describe('AppService Methods', () => {
    it('should return users', () => {
      expect(service.getUsers()).toStrictEqual(environment.users);
    });

    it('should rewrite local peers to NCTL RPC ports (not 7777)', async () => {
      getCasperSDK.mockClear();
      getPeers.mockResolvedValueOnce({
        peers: [
          { address: '127.0.0.1:34553', node_id: 'n0' },
          { address: '127.0.0.1:34554', node_id: 'n1' },
        ],
      });
      const expectedPeers = [
        { address: 'http://localhost:11101', node_id: 'n0' },
        { address: 'http://localhost:11102', node_id: 'n1' },
      ];
      expect(await service.getPeers('http://localhost:11101')).toEqual(
        expectedPeers,
      );
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, 'http://localhost:11101');
    });

    it('should list unique public-network peers as http://host:port (not the official RPC)', async () => {
      getCasperSDK.mockClear();
      getPeers.mockClear();
      getPeers.mockResolvedValueOnce({
        peers: [
          { address: '88.99.3.132:35000', node_id: 'tls:a' },
          { address: '65.109.35.234:35000', node_id: 'tls:b' },
          { address: '88.99.3.132:35000', node_id: 'tls:a-dup' },
        ],
      });
      expect(
        await service.getPeers('https://node.testnet.casper.network'),
      ).toEqual([
        { address: 'http://88.99.3.132:35000', node_id: 'tls:a' },
        { address: 'http://65.109.35.234:35000', node_id: 'tls:b' },
      ]);
      expect(getCasperSDK).toHaveBeenCalledWith(
        'https://node.testnet.casper.network',
      );
      expect(getPeers).toHaveBeenCalled();
    });

    it('should list unique mainnet peers the same way', async () => {
      getPeers.mockResolvedValueOnce({
        peers: [
          { address: '1.2.3.4:35000', node_id: 'm1' },
          { address: '5.6.7.8:35000', node_id: 'm2' },
        ],
      });
      expect(
        await service.getPeers('https://node.mainnet.casper.network'),
      ).toEqual([
        { address: 'http://1.2.3.4:35000', node_id: 'm1' },
        { address: 'http://5.6.7.8:35000', node_id: 'm2' },
      ]);
    });

    it('should dedupe rewritten local peer RPC URLs', async () => {
      getPeers.mockResolvedValueOnce({
        peers: [
          { address: '127.0.0.1:34553', node_id: 'n0' },
          { address: '127.0.0.1:34554', node_id: 'n1' },
          { address: '127.0.0.1:34553', node_id: 'n0-dup' },
        ],
      });
      expect(await service.getPeers('http://localhost:11101')).toEqual([
        { address: 'http://localhost:11101', node_id: 'n0' },
        { address: 'http://localhost:11102', node_id: 'n1' },
      ]);
    });

    it('should rewrite custom-network peers with api scheme/port and dedupe RPC URLs', async () => {
      getPeers.mockResolvedValueOnce({
        peers: [
          { address: '10.0.0.1:35000', node_id: 'c1' },
          { address: '10.0.0.2:35000', node_id: 'c2' },
          { address: '10.0.0.1:35000', node_id: 'c1-dup' },
        ],
      });
      expect(await service.getPeers('https://rpc.example.com:8443')).toEqual([
        { address: 'https://10.0.0.1:8443', node_id: 'c1' },
        { address: 'https://10.0.0.2:8443', node_id: 'c2' },
      ]);
    });

    it('should return an empty list when the node reports no peers', async () => {
      getPeers.mockResolvedValueOnce({ peers: [] });
      expect(await service.getPeers('http://localhost:11101')).toEqual([]);
    });

    it('should skip peers with empty gossip addresses', async () => {
      getPeers.mockResolvedValueOnce({
        peers: [
          { address: '', node_id: 'empty' },
          { address: '127.0.0.1:34553', node_id: 'n0' },
        ],
      });
      expect(await service.getPeers('http://localhost:11101')).toEqual([
        { address: 'http://localhost:11101', node_id: 'n0' },
      ]);
    });

    it('should return StateRootHash', async () => {
      getCasperSDK.mockClear();
      const expectedStateRootHash = test;
      expect(await service.getStateRootHash(url)).toEqual(
        expectedStateRootHash,
      );
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, url);
      expect(getStateRootHash).toHaveBeenNthCalledWith(1);
      getCasperSDK.mockClear();
      expect(await service.getStateRootHash('')).toEqual(expectedStateRootHash);
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStateRootHash).toHaveBeenCalledTimes(2);
      getCasperSDK.mockClear();
      const stringify = true;
      expect(await service.getStateRootHash(url, stringify)).toEqual(
        JSON.stringify(expectedStateRootHash),
      );
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, url);
      expect(getStateRootHash).toHaveBeenCalledTimes(3);
      getCasperSDK.mockClear();
      expect(await service.getStateRootHash('', stringify)).toEqual(
        JSON.stringify(expectedStateRootHash),
      );
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStateRootHash).toHaveBeenCalledTimes(4);
    });

    it('should return Status', async () => {
      getCasperSDK.mockClear();
      const expectedStatus = status;
      expect(await service.getStatus(url)).toEqual(
        JSON.stringify(expectedStatus),
      );
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, url);
      expect(getStatus).toHaveBeenNthCalledWith(1);
      getCasperSDK.mockClear();
      expect(await service.getStatus(undefined)).toEqual(
        JSON.stringify(expectedStatus),
      );
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, undefined);
      expect(getStatus).toHaveBeenNthCalledWith(1);
      getCasperSDK.mockClear();
      expect(await service.getStatus('')).toEqual(
        JSON.stringify(expectedStatus),
      );
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStatus).toHaveBeenNthCalledWith(1);
      getCasperSDK.mockClear();
      let expectedResult = '';
      getStatus.mockResolvedValueOnce({
        api_version: expectedResult,
      });
      expect(await service.getStatus('')).toEqual(
        JSON.stringify(expectedResult),
      );
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStatus).toHaveBeenNthCalledWith(1);
      expectedResult = undefined;
      getStatus.mockResolvedValueOnce({
        api_version: expectedResult,
      });
      expect(await service.getStatus('')).toEqual(
        JSON.stringify(expectedResult),
      );
      expect(getCasperSDK).toHaveBeenNthCalledWith(1, '');
      expect(getStatus).toHaveBeenNthCalledWith(1);
    });

    it('should put_transaction and return transaction_hash', async () => {
      getCasperSDK.mockClear();
      put_transaction.mockClear();
      const signed = {
        verify: () => true,
        toJson: () => ({ signed: true }),
      };
      const result = await service.putTransaction(
        signed as never,
        'http://localhost:11101',
      );
      expect(result.transaction_hash).toBe('tx-hash-1');
      expect(put_transaction).toHaveBeenCalled();
    });
  });
});
