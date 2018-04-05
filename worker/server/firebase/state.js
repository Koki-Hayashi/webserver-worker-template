// @flow
import { db } from './firebaseAdmin';

export async function set(id: string, data: _STATE) {
  // TODO try catch
  return await db.ref('state/' + id).set(data);
}

export async function fetch(id: string): Promise<_STATE> {
  // TODO try catch
  return await db
    .ref('state/' + id)
    .once('value')
    .then(function(snap) {
      return snap.val();
    });
}

export async function fetchAll(): Promise<Array<_STATE>> {
  // TODO try catch
  return await db
    .ref('state/')
    .once('value')
    .then(function(snap) {
      return snap.val();
    });
}

export const QUEUED = 'QUEUED';
export const WORKER_PROCESSING = 'WORKER_PROCESSING';
export const WORKER_PROCESSED = 'WORKER_PROCESSED';
export const WORKER_PROCESS_FAILED = 'WORKER_PROCESS_FAILED';

export const STATUS = {
  QUEUED,
  WORKER_PROCESSING,
  WORKER_PROCESSED,
  WORKER_PROCESS_FAILED
};

export type _STATUS = $Keys<typeof STATUS>;

export type _STATE = {
  status: string,
  origName: string,
  origImgPath: string,
  resizedName: string,
  resizedImgPath: string,
  uploadTime: number,
  lastUpdate: number
};
