const {admin} = require('../firebaseConfig.js');
const {log} = require('./log.js');
class Patient {
//need userId, name, email, dob fields
  static createPatient(userId, name, email, dob, sex) {
    return admin.database().ref('patients/' + userId).set({
      name: name,
      email: email,
      dob: dob,
      sex: sex,
      prescription : [""],
      doctors: [""]
    }, log);

  }
//takes the patient id and then takes the presId
  static addPrescription(pId, presId){
    return admin.database().ref('patients/'+pId).once('value').then(function(snapshot){
      if (!snapshot.exists()){
        console.log("Does not exist")
        return false;
      }
      var newPrescId = Object.keys(snapshot.val()).length
      return admin.database().ref('patients/'+pId + '/prescription').push(presId);
    }, log)
  }

  static readUser(pId){
    return admin.database().ref('patients/'+pId).once('value').then(function(snapshot){
      if (!snapshot.exists()){
        console.log("Does not exist")
        return false
      }
      return snapshot.val();
    })
  }
  static addDoctor(pId, docId){
    var doctor = {id: docId}
    return admin.database().ref('patients/'+pId).once('value').then(function(snapshot){
      if (!snapshot.exists()){
        console.log("Does not exist")
        return false;
      }
      console.log(snapshot.val())
      return admin.database().ref('patients/'+pId + '/doctors').push(doctor);
    }, log)
  }
}
module.exports = Patient;
