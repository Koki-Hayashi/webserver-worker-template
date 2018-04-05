// @flow

import Queue from 'firebase-queue';
const fs = require('fs');
import { db } from '../firebase/firebaseAdmin';
import { resizeImage } from '../image/imageService';

const ref = db.ref('queue');

import {
  set as setState,
  fetch as fetchState,
  WORKER_PROCESSING,
  WORKER_PROCESSED,
  WORKER_PROCESS_FAILED
} from '../firebase/state';
import type { _STATE, _STATUS } from '../firebase/state';

async function updateStatus(id: string, state: _STATE, status: _STATUS) {
  // TODO try catch
  logger.info('update status to: ' + status);
  state.status = status;
  state.lastUpdate = Date.now();
  await setState(id, state);
}

async function fetchCurrentState(id: string): Promise<_STATE> {
  return await fetchState(id).catch(e => {
    logger.error('error occurred while fetching current state');
    logger.error(e);
    throw e;
  });
}

export default function start(): void {
  new Queue(ref, function(data, progress, resolve, reject) {
    // Read and process task
    logger.info('----------------------');
    logger.info('worker received a task');

    const { id } = data;
    logger.info('target image id : ' + id);

    (async () => {
      let state: _STATE;
      try {
        state = await fetchCurrentState(id);
      } catch (e) {
        logger.error(e.message);
        reject(e.message);
        return;
      }

      try {
        await updateStatus(id, state, WORKER_PROCESSING);

        try {
          fs.statSync(state.origImgPath); // TODO check if this is really working
        } catch (e) {
          logger.error(e);
          await updateStatus(id, state, WORKER_PROCESS_FAILED);
          reject(e.message);
          return;
        }

        const { resizedName, resizedImgPath } = await resizeImage(state);
        state.resizedName = resizedName;
        state.resizedImgPath = resizedImgPath;
        await setState(id, state);

        await updateStatus(id, state, WORKER_PROCESSED);

        resolve(); // remove this task from queue
      } catch (e) {
        logger.error(e);
        await updateStatus(id, state, WORKER_PROCESS_FAILED);
        reject(e.message);
      }
    })().catch(e => {
      logger.error(e);
      reject(e.message);
    });
  });
}
