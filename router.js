const express = require('express');
const router = express.Router();
const handlers = require("./handlers");

router.get('/', handlers.C3_homepage) // direct the user to the homepage from the main url

router.get('/PoliceForm', handlers.Police_form_create)// direct to the creat form

router.get('/PoliceForm/:crimeID', handlers.Police_form_edit)// direct to the edit form

router.get('/WitnessForm', handlers.witness_form)

router.get('/PoliceView', handlers.police_view)

router.get('/Police_Form_View/:crimeID', handlers.police_form_view)
router.post('/LogIn', handlers.LogIn)// direct the loin details to the login handler to verify uers/pass

router.post('/CreateCrime',handlers.CreateCrime ) // direct the Police loged in to a create crime form
router.post('/EditCrime/:crimeID',handlers.EditCrime ) 
router.post('/addWitnessInput/:crimeID',handlers.saveWitnessInput ) 
router.post('/searchCrime', handlers.searchCrime)
router.post('/policeSearchCrime', handlers.policeSearchCrime)
module.exports = router;