import { Users, api_interface } from '@casper-api/api-interfaces';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(api_interface.Users)
  getUsers(): Users {
    return this.appService.getUsers();
  }
}
