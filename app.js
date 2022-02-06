/* eslint-disable */
const http = require('http');
const express = require('express');
const next = require('next');
const IS_DEV = require('./utils/isDev');
const expressSetup = require('./utils/expressSetup');

const app = express();
const nextApp = next({ dev: IS_DEV });
const httpServer = http.createServer(app);

class Server {
  async loadDeps() {
    await nextApp.prepare();
  }

  async listen() {
    await this.loadDeps();
    expressSetup(app, nextApp.getRequestHandler());
    httpServer.listen(...arguments);
  }

  getClusterNode() {
    return this;
  }

  on(...args) {
    return httpServer.on(...args);
  }
}

process.on('unhandledRejection', (err) => {
  console.error(err);
});

process.on('uncaughtException', (err) => {
  console.error(err);
});

if (require.main === module) {
  // configureMaasLogger('', {}, true);
  new Server().listen(process.argv[3]);
} else {
  module.exports = { Server };
}
