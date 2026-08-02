import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { urlencoded, json } from 'express';
import { AppModule } from './app/app.module';
import * as proxy from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';

/**
 * Casper 2 SSE targets:
 * - NCTL 2 docker: localhost:18101-18105/events
 * - public testnet/mainnet: https://node.*.casper.network/events
 * - custom: same host with /events (optional /main legacy)
 */
const SSE_TARGET_REGEX =
  /^https?:\/\/(?:localhost|127\.0\.0\.1|[a-z0-9.-]+)(?::\d+)?\/events(?:\/main)?$/i;

const api_url = 'api_url';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(
    '/events',
    (req: Request, res: Response, next: (err?: NextFunction) => void) => {
      const target = resolveApiUrl(req);
      if (!target) {
        console.error('Missing or disallowed SSE target URL for proxy');
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Proxy target missing or not allowed');
        return;
      }
      const proxyMiddleware = proxy.createProxyMiddleware({
        target,
        changeOrigin: true,
        ignorePath: true,
        pathFilter: pathFilter,
        secure: true,
        on: {
          proxyReq: (proxyReq) => {
            proxyReq.setHeader('Accept', 'text/event-stream');
          },
          error: (err) => {
            console.error(err);
          },
        },
      });

      return proxyMiddleware(req, res, next);
    },
  );
  const port = 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();

function resolveApiUrl(req: Request) {
  const apiUrl = req.query[api_url] as string | undefined;
  if (!apiUrl) {
    return null;
  }
  return SSE_TARGET_REGEX.test(apiUrl) ? apiUrl : null;
}

const pathFilter = function (path, req) {
  return path.match('^/$') && req.method === 'GET';
};
