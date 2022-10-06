import { Module } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { ServiceService } from '../service/service.service';
import { UrlService } from '../util/url/url.service';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DeployerController } from './controller/deployer/deployer.controller';

@Module({
  imports: [],
  controllers: [AppController, DeployerController],
  providers: [
    AppService,
    ClientService,
    ServiceService,
    UrlService],
})
export class AppModule { }
