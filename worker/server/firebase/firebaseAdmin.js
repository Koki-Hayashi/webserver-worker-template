// @flow

const firebaseAdmin = require("firebase-admin");
const serviceAccount = require("your-service-account.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "your db url"
});

export const db = firebaseAdmin.database();

export default firebaseAdmin;
