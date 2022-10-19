import { Purse } from '@casper-escrow/api-interfaces';
import { Test, TestingModule } from '@nestjs/testing';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  const test = 'test', balance = test, purse: Purse = {
    balance
  }, getPurse = jest.fn().mockResolvedValue(purse);

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [

        {
          provide: AppService, useValue: {
            getUsers: jest.fn().mockReturnValue(environment.users),
            getPurse
          }
        }
      ],
    }).compile();
  });

  describe('Methods', () => {
    it('should return Users', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getUsers()).toEqual(environment.users);
    });

    it('should return Purse', async () => {
      getPurse.mockClear();
      const appController = app.get<AppController>(AppController);
      expect(await appController.getPurse('')).toEqual(purse);
      expect(getPurse).toHaveBeenNthCalledWith(1, "", undefined);
      expect(await appController.getPurse(test)).toEqual(purse);
      expect(getPurse).toHaveBeenNthCalledWith(2, test, undefined);
      expect(await appController.getPurse('', test)).toEqual(purse);
      expect(getPurse).toHaveBeenNthCalledWith(3, '', test);
      expect(await appController.getPurse(test, test)).toEqual(purse);
      expect(getPurse).toHaveBeenNthCalledWith(4, test, test);
    });

    it('should throw on bad Purse', async () => {
      const error: Error = new Error(test);
      const appController = app.get<AppController>(AppController);
      getPurse.mockRejectedValue(error);
      expect((await appController.getPurse(undefined, undefined) as Error).name).toStrictEqual(`Error: ${test}`);
    });
  });
});
