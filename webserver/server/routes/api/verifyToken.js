// @flow

import type { $Request as _Request, $Response as _Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', function(req: _Request, res: _Response): void {
  res.status(200).send({ verify: true }); // it's already verified since there is common verification for all request to /api
});

module.exports = router;
