// @flow

import firebase from '../../universal/firebase/firebase';
import config from '../configs/config';

const logoutUrl: string = config.logoutUrl;

export function logout(): void {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // deleting cookie is practically enough
      document.cookie =
        'jwt' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

      redirectToLogin();
    })
    .catch(function(error) {
      throw new Error(error.message);
    });
}

function redirectToLogin(): void {
  window.location.href = logoutUrl;
}
