import { Test, TestingModule } from '@nestjs/testing';
import { DeployerController } from './deployer.controller';

describe('DeployerController', () => {
  let controller: DeployerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeployerController],
    }).compile();

    controller = module.get<DeployerController>(DeployerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
