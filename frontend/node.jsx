const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();

// Middleware to redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// Handle HTTP requests
http.createServer(app).listen(80, () => {
  console.log('HTTP server running on port 80');
});

// SSL/TLS certificate options
const options = {
  key: fs.readFileSync('./ssl/localhost.pem'),
  cert: fs.readFileSync('./ssl/localhost-key.pem')
};

// Handle HTTPS requests
https.createServer(options, app).listen(443, () => {
  console.log('HTTPS server running on port 443');
});
