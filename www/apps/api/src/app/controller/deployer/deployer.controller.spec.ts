import { Peer } from '@casper-escrow/api-interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../../app.service';
import { DeployerController } from './deployer.controller';

describe('DeployerController', () => {
  let controller: DeployerController;
  const test = 'test',
    url = test,
    address = '127.0.0.1',
    node_id = test,
    peers: Peer[] = [{
      address,
      node_id
    }], getPeers = jest.fn().mockResolvedValue(peers);
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeployerController],
      providers: [
        {
          provide: AppService, useValue: {
            getPeers
          }
        }
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
});
