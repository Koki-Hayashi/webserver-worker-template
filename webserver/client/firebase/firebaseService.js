// @flow

import firebase from '../../universal/firebase/firebase';
import config from '../configs/config';

export function setFirebaseRefreshToken(): void {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      user.getIdToken(true).then(token => {
        document.cookie = config.cookie.jwt + '=' + token + '; path=/';
        setTimeout(setFirebaseRefreshToken, 3000000);
      });
    }
  });
}
