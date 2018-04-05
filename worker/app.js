const express = require('express');
const status = require('./server/routes/status');
const nocache = require('nocache');
import { STATUS } from './server/enum/END_POINT';
import init from './server/init/initService';

init(); // initialize

const app = express();

app.use(nocache());
app.use(STATUS, status);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send(err.message);
});

module.exports = app;
