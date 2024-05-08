/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';
import { AppModule } from './app/app.module';
import * as proxy from 'http-proxy-middleware';
import { environment } from './environments/environment';

const regex = /http:\/\/[\d+.]+:9999/;
const api_url = 'api_url';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use('/events/*', function (req, res, next) {
    proxy.createProxyMiddleware({
      target: resolveApiUrl(req),
      changeOrigin: true,
      pathRewrite: function (path, req) {
        let base_url: URL;
        try {
          const url = (req.query[api_url] || environment['sseUrl']) as string;
          base_url = new URL(url);
        } catch (err) {
          console.error(err);
        }
        path = path.replace(['/', globalPrefix, '/'].join(''), '/');
        path = path.replace([api_url, base_url.origin].join('='), '');
        return path;
      }
    })(req, res, next);
  });
  const port = 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );

}

bootstrap();

function resolveApiUrl(req) {
  return regex.test(req.query[api_url]) && req.query[api_url];
}
