import type {
  $Request as _Request,
  $Response as _Response,
  NextFunction as _NextFunction
} from 'express';

const express = require('express');
const cons = require('consolidate');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./server/routes/index');
const spa = require('./server/routes/spa');
const notFound = require('./server/routes/notFound');
const status = require('./server/routes/status');
const api = require('./server/routes/api');
const nocache = require('nocache');
import { API, LOGIN, STATUS } from './universal/enum/END_POINT';
import init from './server/init/initService';

import { LOGIN_HOME, SPA_HOME } from './universal/enum/LAYER';

init(); // initialize

const app = express();

// view engine setup
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'html');

app.use(nocache());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/scripts', express.static(path.join(__dirname, './node_modules/')));
app.use('/js', express.static(path.join(__dirname, './public/js/')));
app.use('/css', express.static(path.join(__dirname, './public/css/')));
app.use('/img', express.static(path.join(__dirname, './public/img/')));
app.use(
  '/iconfonts',
  express.static(path.join(__dirname, './public/iconfonts/'))
);

app.use(STATUS, status);
app.use(API, api);
app.use('/', index);
app.use(LOGIN_HOME, index);
app.use(SPA_HOME, spa);
app.use(SPA_HOME + '/*', spa);
app.use('*', notFound);

// error handler
app.use(function(
  err: Error,
  req: _Request,
  res: _Response,
  next: _NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
