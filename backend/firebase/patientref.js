const {admin} = require('../firebaseConfig.js')

class Patient {

static writePatientData(userId, name, email) {
  console.log(userId);
  console.log(name);
  admin.database().ref('patients/' + userId).set({
    name: name,
    email: email,
    prescription : [],
    doctors: []
  }).catch((err) => console.log(err));

}
}
module.exports = Patient;
