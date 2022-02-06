const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const httpStatusCodes = require('http-status-codes');
// const { configureMaasLogger } = require('./logger.js');
const IS_DEV = require('./isDev');

module.exports = (app, nextHandler) => {
  if (IS_DEV) {
    const { getAppYamlConfig } = require('./helpers');
    const { servicename, appname } = getAppYamlConfig();
    // configureMaasLogger(process.env.MONITORING_KEY, { servicename, appname }, true);
  }

  app.disable('x-powered-by');
  app.disable('etag');

  app.enable('case sensitive routing');
  app.enable('strict routing');

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser());

  app.use((req, res, next) => {
    req.rpc = {
      _healthcheck: (params, callback) => setImmediate(() => callback(null, 'OK')),
    };
    next();
  });

  app.use((req, res, next) => {
    req.originalUrl = decodeURI(req.originalUrl);
    next();
  });

  /* webpack HMR */
  app.use((req, res, next) => {
    if (req.url.includes('webpack-hmr')) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.status(httpStatusCodes.OK).end();
    } else {
      next();
    }
  });

  /* next request handler */
  app.use(nextHandler);
};
