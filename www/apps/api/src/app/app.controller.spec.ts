import { Test, TestingModule } from '@nestjs/testing';
import { environment } from '../environments/environment';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;
  const test = 'test', balance = test, purse = {
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
  });
});
