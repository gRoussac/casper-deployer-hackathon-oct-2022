import { Module } from '@nestjs/common';
import { UrlService } from '../util/url/url.service';

import { AppService } from './app.service';
import { DeployerController } from './controller/deployer/deployer.controller';
import { SDKService } from '../sdk/sdk.service';

@Module({
  imports: [],
  controllers: [DeployerController],
  providers: [AppService, UrlService, SDKService],
})
export class AppModule {}
