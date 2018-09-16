var express = require('express');
var router = express.Router();
var Prescription = require('../firebase/prescriptionref.js');

router.post('/create', function(req, res, next) {
//req.body needs to have a patientId\
//otherwise it just makes sure to put whatever is sent
  if(!req.body.patientId || !req.body.drugName){
    res.status(404).send({error: "need a patientId in request body"})
  }
  Prescription.createPrescription(req.body).then((data) => res.send(data))

});
//needs a drug, date, prescriptionid to add dose
router.post('/adddose', function(req,res,next){
  if(!req.body.drugName || ! req.body.drugClass || !req.body.prescriptionId || !req.body.frequency || !req.body.startDate || !req.body.endDate || !req.body.dosagePrescribed || !req.body.dosagesTaken || !req.body.withFood){
    res.status(404).send({error: "You need to send all params"})
  }
  Prescription.addDose(req.body).then((data) => res.send(data))
})
//just takes an id and returns the data
router.get('/:id', function(req, res, next){
  Prescription.getPrescription(req.params.id).then((data) => res.send(data));
})

//just takes an patient and find only there prescriptions
router.post('/individual', function(req, res, next){
  var id = req.body.patientId
  Prescription.getIndividual(id).then(function(value){
    res.send(value);
  })
})


module.exports = router;
