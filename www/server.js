const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 4242;

app.use('/', express.static(path.join(__dirname, 'apps/frontend/')));

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://127.0.0.1:3333/api',
    changeOrigin: true,
  }),
);

app.use(
  '/events',
  createProxyMiddleware({
    target: 'http://127.0.0.1:3333/events',
    changeOrigin: true,
  }),
);

app.listen(port);
console.log('Server started at http://localhost:' + port);
