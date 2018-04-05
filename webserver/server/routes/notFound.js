// @flow

import type {
  $Request as _Request,
  $Response as _Response,
  NextFunction as _NextFunction
} from 'express';

const express = require('express');
const router = express.Router();

router.get('/', function(req: _Request, res: _Response): void {
  res.render('notFound');
});

module.exports = router;
