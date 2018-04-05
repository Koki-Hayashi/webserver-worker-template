// @flow

import type { $Request as _Request, $Response as _Response } from 'express';

const express = require('express');
const router = express.Router();

router.get('/', function(req: _Request, res: _Response): void {
  res.status(200).send('Ok');
});

module.exports = router;
