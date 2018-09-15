var express = require('express');
var router = express.Router();
var Patient = require('../firebase/patientref.js');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  var id = req.body.id,
    name = req.body.name,
    email = req.body.email;

  Patient.createPatient(id, name, email)

  res.send(id);
});

router.post('/prescription', function(req, res, next){
  var id = req.body.id,
    prescription = req.body.prescription
  if (!id || !prescription){
    res.status(404).end()
  }
  Patient.addPrescription(id, prescription).then((data) => res.send(data));
})

router.post('/read', function(req,res,next){
  var id = req.body.id
  if (!id){
    res.status(404).end()
  }
  Patient.readUser(id).then((data) => res.send(data))
})

router.post('/adddoctor', function(req,res,next){
  var id = req.body.id,
    doctorId = req.body.doctorId

  Patient.addDoctor(id, doctorId)
})
module.exports = router;
