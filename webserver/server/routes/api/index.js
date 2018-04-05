// @flow

import type {
  $Request as _Request,
  $Response as _Response,
  NextFunction as _NextFunction
} from 'express';

const express = require('express');
const router = express.Router();
import firebaseAdmin from '../../firebase/firebaseAdmin';
const verifyToken = require('./verifyToken');
const image = require('./image/image');

const { VERIFY_TOKEN, IMAGE } = require('../../../universal/enum/END_POINT');

// has to be verified all of rest endpoints
router.use(function(req: _Request, res: _Response, next: _NextFunction): void {
  try {
    return firebaseAdmin
      .auth()
      .verifyIdToken(req.cookies.jwt)
      .then(() => {
        return next();
      })
      .catch(error => {
        logger.error(error);
        res.status(401).send('not authorized');
      });
  } catch (error) {
    logger.error(error);
    res.status(401).send('Failed to verify id token');
  }
});

router.use(VERIFY_TOKEN, verifyToken);
router.use(IMAGE, image);

module.exports = router;
