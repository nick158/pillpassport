const {admin} = require('../firebaseConfig.js')
const {log} = require('./log.js');
class Doctor {

static writeDoctorData(userId, name, email) {
  console.log(userId);
  console.log(name);
  admin.database().ref('doctors/' + userId).set({
    name: name,
    email: email,
    patients : [""]
  }).catch((err) => console.log(err));

}

static viewDoctors() {

  return admin.database().ref('doctors/').once('value').then(function(snapshot){
    console.log(snapshot.val());
    return snapshot.val()
  }
)

}

static addPatient(id, patId){
  var patient = {id: patId}
  return admin.database().ref('doctors/'+id).once('value').then(function(snapshot){
    if (!snapshot.exists()){
      console.log("Does not exist")
      return false;
    }
    console.log(snapshot.val())
    return admin.database().ref('doctors/'+id + '/patients').push(patient);
  }, log)

}

static viewPatients(id) {

  return admin.database().ref('doctors/'+id+'/patients').once('value').then(function(snapshot){
    console.log(snapshot.val());
    return snapshot.val()
  }
)
}



}










module.exports = Doctor;
