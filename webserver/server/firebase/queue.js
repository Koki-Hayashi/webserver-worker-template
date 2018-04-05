// @flow

import { db } from '../firebase/firebaseAdmin';
const queue = db.ref('queue/tasks');

export default queue;
