const {admin} = require('../firebaseConfig.js');
const {log} = require('./log.js');
class Patient {

  static createPatient(userId, name, email) {
    console.log(userId);
    console.log(name);
    admin.database().ref('patients/' + userId).set({
      name: name,
      email: email,
      prescription : [""],
      doctors: [""]
    }, log);

  }

  static addPrescription(pId, prescObj){
    return admin.database().ref('patients/'+pId).once('value').then(function(snapshot){
      if (!snapshot.exists()){
        console.log("Does not exist")
        return false;
      }
      console.log(snapshot.val())
      return admin.database().ref('patients/'+pId + '/prescription').push(prescObj);
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
