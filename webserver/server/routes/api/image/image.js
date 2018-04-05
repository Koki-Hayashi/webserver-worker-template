// @flow

import type { $Request as _Request, $Response as _Response } from 'express';

import {
  OK,
  NO_CONTENT,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR
} from '../../../../universal/enum/HTTP_STATUS';

import { IMG } from '../../../../universal/enum/REQ_FIELD_NAME';

import queue from '../../../firebase/queue';
import {
  set as setState,
  fetch as fetchState,
  fetchAll as fetchAllState,
  QUEUED
} from '../../../firebase/state';
import type { _STATE } from '../../../firebase/state';
import type { _IMAGE_STATE_SERVER } from './dtoTypes';
import { mapServerDtoToClient, sortByUploadTimeDesc } from './mapper';

import config from '../../../configs/config';

import uuid from 'uuid/v4';

const express = require('express');
const router = express.Router();

const fs = require('fs');

const fileUpload = require('express-fileupload');
router.use(fileUpload());

async function fetchAll(): Promise<_IMAGE_STATE_SERVER> {
  return await fetchAllState().catch(e => {
    logger.error('error occurred while fetching all state');
    logger.error(e);
    throw e;
  });
}

router.get('/', function(req: _Request, res: _Response): void {
  logger.info('Fetching all status...');

  (async function() {
    let states: _IMAGE_STATE_SERVER;
    try {
      states = await fetchAll();
    } catch (e) {
      logger.error(e.message);
      res.status(INTERNAL_SERVER_ERROR).send(e.message);
      return;
    }

    res.status(OK).send(sortByUploadTimeDesc(mapServerDtoToClient(states)));
  })().catch(e => {
    logger.error(e);
    res.status(INTERNAL_SERVER_ERROR).send(e.message);
  });
});

async function fetchCurrentState(id: string): Promise<_STATE> {
  return await fetchState(id).catch(e => {
    logger.error('error occurred while fetching current state');
    logger.error(e);
    throw e;
  });
}

router.get('/:imageId/thumbnail', function(
  req: _Request,
  res: _Response
): void {
  const id = req.params.imageId;
  logger.info('Got an thumbnail fetch request. id: ' + id);

  (async function() {
    let state: _STATE;
    try {
      state = await fetchCurrentState(id);
    } catch (e) {
      logger.error(e.message);
      res.status(INTERNAL_SERVER_ERROR).send(e.message);
      return;
    }

    if (!state) {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send('Current state is missing. id: ' + id);
      return;
    }

    const resizedImg: string = state.resizedImgPath;

    if (!resizedImg) {
      logger.info('Not resized yet. id:' + id);
      res.status(NO_CONTENT).send('The thumbnail is not ready yet.');
      return;
    }

    try {
      fs.statSync(resizedImg); // check existence of the resized image
    } catch (e) {
      logger.error(e);
      res
        .status(INTERNAL_SERVER_ERROR)
        .send('Sorry, somehow resized image is gone.');
      return;
    }

    res.header('Content-Type', 'image/png');
    res.status(OK).sendFile(resizedImg);
  })().catch(e => {
    logger.error(e);
    res.status(INTERNAL_SERVER_ERROR).send(e.message);
  });
});

router.post('/', function(
  req: _Request & { files: { image: string } },
  res: _Response
): void {
  const { files } = req;
  if (!files) {
    res.status(BAD_REQUEST).send('an image should be sent.');
    return;
  }

  const image = files[IMG]; // TODO share filed name bet. client and server

  if (!image) {
    res
      .status(BAD_REQUEST)
      .send('an image should be sent with field name "' + IMG + '".');
    return;
  }

  const imageName = image.name;

  logger.info('received an image:', imageName);

  const id = uuid();
  logger.info('id : ', id);

  (async function() {
    await image.mv(config.imgStore + imageName);

    await queue.push({
      // push to queue
      id: id
    });

    const currentTs = Date.now();
    await setState(id, {
      status: QUEUED,
      origName: imageName,
      origImgPath: config.imgStore,
      resizedName: '',
      resizedImgPath: '',
      uploadTime: currentTs,
      lastUpdate: currentTs
    }); // update the state

    res.status(OK).send({ id: id });
  })().catch(e => {
    logger.error(e);
    res.status(INTERNAL_SERVER_ERROR).send(e.message);
  });
});

module.exports = router;
