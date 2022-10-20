import { Purse, Error, Users } from '@casper-api/api-interfaces';
import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('users')
  getUsers(): Users {
    return this.appService.getUsers();
  }

  @Get('purse')
  async getPurse(
    @Query('publicKey') publicKey: string,
    @Query('apiUrl') apiUrl?: string
  ): Promise<Purse | Error> {
    try {
      return await this.appService.getPurse(publicKey, apiUrl);
    } catch (error) {
      return { name: error.toString(), message: error };
    }
  }
}
