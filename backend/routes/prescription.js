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
  if(!req.body.drug || ! req.body.date || !req.body.prescriptionId){
    res.status(404).send({error: "You to send a dose obj with a drug, id, and a date property"})
  }
  Prescription.addDose(req.body).then((data) => res.send(data))
})
//just takes an id and returns the data
router.get('/:id', function(req, res, next){
  Prescription.getPrescription(req.params.id).then((data) => res.send(data));
})

module.exports = router;
