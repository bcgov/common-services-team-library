const compression = require('compression');
const express = require('express');
const Problem = require('api-problem');

const carboneCopyApi = require('@bcgov/carbone-copy-api');

const apiBasePath = process.env.API_PATH || '/';
const uploadFileSize = process.env.UPLOAD_FILE_SIZE || '25mb';

const app = express();
app.use(compression());
app.use(express.json({ limit: uploadFileSize }));
app.use(express.urlencoded({ extended: true }));

carboneCopyApi.mount(app, apiBasePath);

// Handle 500
app.use((err, req, res, _next) => {
  if (err.stack) {
    console.log(err.stack);
  }

  if (err instanceof Problem) {
    err.send(res);
  } else {
    new Problem(500, { details: (err.message) ? err.message : err }).send(res);
  }
});

// Handle 404
app.use((_req, res) => {
  new Problem(404).send(res);
});

// Prevent unhandled errors from crashing application
process.on('unhandledRejection', err => {
  if (err && err.stack) {
    console.log(err.stack);
  }
});

// Graceful shutdown support
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
  console.log('Received kill signal. Shutting down...');
  // Wait 3 seconds before hard exiting
  setTimeout(() => process.exit(), 3000);
}

module.exports = app;
