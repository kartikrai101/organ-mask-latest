const express = require('express');
const router = express.Router();
const {registerDonor, getDonorDetails, login, updateDonorDetails} = require('../controllers/patientControllers');
const {registerRecipient, getRecipientDetails, updateRecipientDetails, searchRecipient} = require('../controllers/recipientControllers')

// ---------------- donor routes ----------------------------
router.route('/donor/register').post(registerDonor);
router.route('/donor/:id').get(getDonorDetails);
router.route('/donor/:id').put(updateDonorDetails);


// ---------------- recipient routes ----------------------------
router.route('/recipient/register').post(registerRecipient)
router.route('/recipient/:id').get(getRecipientDetails);
router.route('/recipient/:id').put(updateRecipientDetails);
router.route('/recipient/search').post(searchRecipient);


// ----------------- patient login ----------------
router.route('/login').post(login)

module.exports = router;