const express = require('express');
const router = express.Router();
const {loginController, getRegisteredDonors, getVerifiedDonors, getDonatedDonors, getRegisteredRecipients, getVerifiedRecipients, getReceivedRecipients, getAllDonors, getAllRecipients} = require('../controllers/hospitalControllers')

router.route('/login').post(loginController);

router.route('/donor/registered').get(getRegisteredDonors);
router.route('/donor/verified').get(getVerifiedDonors);
router.route('/donor/donated').get(getDonatedDonors);

router.route('/recipient/registered').get(getRegisteredRecipients);
router.route('/recipient/verified').get(getVerifiedRecipients);
router.route('/recipient/received').get(getReceivedRecipients);

router.route('/get/donors').get(getAllDonors)
router.route('/get/recipients').get(getAllRecipients)

module.exports = router;