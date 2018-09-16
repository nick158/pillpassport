var express = require('express');
var router = express.Router();
var Doctor = require('../firebase/doctorref.js');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  var id = req.body.id,
    name = req.body.name,
    email = req.body.email;

  Doctor.writeDoctorData(id, name, email)

  res.send(id);
});

router.get('/all', function(req, res, next) {
  Doctor.viewDoctors().then(function(value){
    res.send(value);
  })
});

router.post('/addpatient', function(req,res,next){
  var id = req.body.id,
    patientId = req.body.patientId

  Doctor.addPatient(id, patientId).then((data) => res.send(data))
})

router.post('/patients', function(req, res, next) {
  var id = req.body.id
  Doctor.viewPatients(id).then(function(value){
    res.send(value);
  })
});

module.exports = router;
