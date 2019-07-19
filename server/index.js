/* eslint consistent-return:0 */

const express = require('express');
const { resolve } = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const compression = require('compression');

const logger = require('./util//logger');
const argv = require('./util/argv');
const port = require('./util/port');
const setup = require('./middlewares/frontendMiddleware');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.disable('x-powered-by');
app.use(compression());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('X-Content-Type-Options', 'no sniff');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set('Cache-Control', 'public, max-age=31557600');

  if (req.secure || process.env.NODE_ENV !== 'production') {
    next();
  } else {
    res.redirect(`https://${req.headers.host}${req.url}`);
  }
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }
  logger.appStarted(port, prettyHost);
});
