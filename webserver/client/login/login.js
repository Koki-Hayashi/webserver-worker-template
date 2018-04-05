import { SPA_HOME } from '../../universal/enum/LAYER';

import firebase from '../../universal/firebase/firebase';
import config from '../configs/config';

const email = document.getElementById('email');
const password = document.getElementById('password');

const inputFields = [email, password];

function reset() {
  email.classList.remove('error', 'semi-bold');
  password.classList.remove('error', 'semi-bold');
}

for (let i = 0; i < inputFields.length; i++) {
  inputFields[i].addEventListener('focus', reset, false);
}

function showError(errorMsg) {
  document.getElementById('error-message').innerHTML = errorMsg;

  for (const inputField of inputFields) {
    inputField.classList.add('error', 'semi-bold');
  }
}

function hitLogin(e) {
  if (e.keyCode === 13) {
    // 13 : enter key
    document.getElementById('login-btn').click();
  }
}
window.addEventListener('keydown', hitLogin, false);

function fireBaseLogin(email, password) {
  return firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function(error) {
      throw new Error(error.message);
    });
}

function login() {
  (async function() {
    const user = await fireBaseLogin(email.value, password.value); // throw error if failed to login

    const token = await user.getIdToken();

    document.cookie =
      config.cookie.jwt +
      '=' +
      token +
      '; path=/;' +
      (config.cookie.domain || '');
    window.location.replace(SPA_HOME);
  })().catch(error => {
    showError(error.message);
  });
}
window.login = login;
