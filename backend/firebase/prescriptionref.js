const {admin} = require('../firebaseConfig.js');
const {log} = require('./log.js');
const Patient = require('./patientref.js')
class Prescription {
  //Need a minimumm of a prescription ID
  static createPrescription(presObj) {
      var patientId = "";
      if(!presObj.patientId){
        return false
      }
      else{
        patientId = presObj.patientId
      }
      //create the id for the prescription based on a random number
      var prescriptionId = new Date() * Math.random() *100000;
      //check to see if the patient exists
      return admin.database().ref('patients/'+patientId).once('value').then(function(snapshot){
        if (!snapshot.exists()){
          console.log("Does not exist")
          return false
        }
      //if it exists, then add the prescription to the prescription collection
      admin.database().ref('prescriptions/' + String(prescriptionId)).set(
        presObj
    , log);
      // then add the prescription id to the patient prescription
      Patient.addPrescription(patientId, prescriptionId)
      var returnObj = presObj;
      returnObj.id = prescriptionId
      return returnObj
    })
  }
//dose should have drug and date
  static addDose(doseObj){
    if(!doseObj.drug || !doseObj.prescriptionId){
      console.log("You to send a dose obj with a drug, id, and a date property ")
    }
    if(!doseObj.date){
      doseObj.date = Date.now()
    }
    var prescriptionId = doseObj.prescriptionId
    return admin.database().ref('prescriptions/' + prescriptionId).once('value').then(function(snapshot){
      if(!snapshot.exists()){
        console.log("Prescription " + String(prescriptionId) + " does not exist!")
        return false
      }
      return admin.database().ref('prescriptions/'+String(prescriptionId)+'/record').push(doseObj)
    })
  }

  static getPrescription(prescriptionId){
    return admin.database().ref('prescriptions/' + prescriptionId).once('value').then(function(snapshot){
      if(!snapshot.exists()){
        console.log("Prescription " + String(prescriptionId) + ' does not exist')
        return false
      }
      return snapshot.val()
    })
  }
}
module.exports = Prescription;
