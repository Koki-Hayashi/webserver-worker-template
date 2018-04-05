// @flow

import store from './../store/store';
import {
  initLoadFinish,
  setAuthCheckTrue
} from '../appState/appStateActionCreator';
import { checkLogin } from '../auth/authService';
import { setFirebaseRefreshToken } from '../firebase/firebaseService';

export default function init(): void {
  setFirebaseRefreshToken();

  Promise.all([checkSessionValid()]).then(() => {
    setInitLoadFinished();
  });
}

function checkSessionValid(): void {
  if (checkLogin()) {
    store.dispatch(setAuthCheckTrue());
  }
}

function setInitLoadFinished(): void {
  store.dispatch(initLoadFinish());
}
