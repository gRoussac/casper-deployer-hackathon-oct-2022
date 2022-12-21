const express = require('express');
const path = require('path');
const proxy = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 8080;

// sendFile will go here
app.all('/escrow', function(req, res) {
  res.sendFile(path.join(__dirname, '/apps/frontend/index.html'));
});

app.use('/', express.static(path.join(__dirname, 'apps/frontend/')));

const apiProxy = proxy.createProxyMiddleware('/api', { target: 'http://localhost:3333' });
app.get('/api/*', apiProxy);

const eventsProxy = proxy.createProxyMiddleware('/events', { target: 'http://localhost:3333' });
app.get('/events/*', eventsProxy);

app.listen(port);
console.log('Server started at http://localhost:' + port);