var express = require('express');
var router = express.Router();
var Patient = require('../firebase/patientref.js');

//need userId, name, email, dob fields, sex
router.post('/create', function(req, res, next) {
  var id = req.body.id,
    name = req.body.name,
    email = req.body.email,
    dob = req.body.dob,
    sex = req.body.sex
  if(!id || !name || !email || !dob || !sex){
    res.status(404).send({error:"need to make sure id, name, email, dob, and sex field are all defined"})
  }
  Patient.createPatient(id, name, email, dob, sex).then((data) => res.send(data))

});
//need an object with a id and a prescription, returns a prescription confirmation. This creates the thing
router.post('/prescription', function(req, res, next){
  var id = req.body.id,
    prescription = req.body.prescription
  if (!id || !prescription){
    res.status(404).end()
  }
  Patient.addPrescription(id, prescription).then((data) => res.send(data));
})
//needs an id of a patient, returns patient data
router.post('/read', function(req,res,next){
  var id = req.body.id
  if (!id){
    res.status(404).end()
  }
  Patient.readUser(id).then((data) => res.send(data))
})
//needs id (of patient) and needs doctorId. Adds the doctor to a spsecific person
router.post('/adddoctor', function(req,res,next){
  var id = req.body.id,
    doctorId = req.body.doctorId

  Patient.addDoctor(id, doctorId).then((data) => res.send(data))
})
module.exports = router;
