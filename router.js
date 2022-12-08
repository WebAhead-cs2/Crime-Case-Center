const express = require('express');
const router = express.Router();
const handlers = require("./handlers");

router.get('/', handlers.C3_homepage) // direct the user to the homepage from the main url

router.get('/PoliceForm', handlers.Police_form)

router.get('/WitnessForm', handlers.witness_form)

router.get('/PoliceView', handlers.police_view)

router.post('/LogIn', handlers.LogIn)// direct the loin details to the login handler to verify uers/pass



module.exports = router;