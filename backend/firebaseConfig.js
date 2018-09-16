var admin = require("firebase-admin");

var serviceAccount = require("./privatekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://htn2018-a0566.firebaseio.com"
});

module.exports.admin = admin
