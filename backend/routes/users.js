var express = require('express');
var router = express.Router();
var Patient = require('../firebase/patientref.js');

/* GET users listing. */
router.post('/create', function(req, res, next) {
  var id = req.body.id,
    name = req.body.name,
    email = req.body.email;

  Patient.writePatientData(id, name, email)

  res.send(id);
});

module.exports = router;
