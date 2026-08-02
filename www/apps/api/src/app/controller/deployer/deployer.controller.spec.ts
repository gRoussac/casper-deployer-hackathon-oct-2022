import { Peer } from '@casper-api/api-interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../app.service';
import { DeployerController } from './deployer.controller';

jest.mock('casper-rust-wasm-sdk-nodejs', () => ({
  Deploy: jest.fn(),
  Transaction: jest.fn().mockImplementation((json) => ({
    json,
    verify: () => true,
    toJson: () => json,
  })),
}));

describe('DeployerController', () => {
  let controller: DeployerController;
  const test = 'test',
    url = test,
    address = '127.0.0.1',
    node_id = test,
    peers: Peer[] = [
      {
        address,
        node_id,
      },
    ],
    getPeers = jest.fn().mockResolvedValue(peers),
    putTransaction = jest
      .fn()
      .mockResolvedValue({ transaction_hash: 'tx-abc' }),
    getTransaction = jest.fn().mockResolvedValue({ hash: 'tx-abc' });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeployerController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getPeers,
            putTransaction,
            getTransaction,
          },
        },
      ],
    }).compile();

    controller = module.get<DeployerController>(DeployerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return Peers', async () => {
    expect(await controller.getPeers('')).toEqual(peers);
    expect(await controller.getPeers(url)).toEqual(peers);
  });

  it('should throw on bad Peers', async () => {
    const error: Error = new Error(test);
    getPeers.mockResolvedValue(error);
    expect(await controller.getPeers('')).toStrictEqual(error);
    expect(await controller.getPeers(url)).toStrictEqual(error);
  });

  it('should put_transaction', async () => {
    const body = JSON.stringify({ Version1: {} });
    const result = await controller.putTransaction(body, url);
    expect(result).toEqual({ transaction_hash: 'tx-abc' });
    expect(putTransaction).toHaveBeenCalled();
  });

  it('should get_transaction', async () => {
    const result = await controller.getTransaction(url, 'tx-abc');
    expect(result).toEqual({ hash: 'tx-abc' });
    expect(getTransaction).toHaveBeenCalledWith('tx-abc', url);
  });
});
