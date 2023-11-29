const express = require('express');
const router = express.Router();
const {loginController, getRegisteredDonors, getVerifiedDonors, getDonatedDonors, getRegisteredRecipients, getVerifiedRecipients, getReceivedRecipients} = require('../controllers/hospitalControllers')

router.route('/login').post(loginController);

router.route('/donor/registered').get(getRegisteredDonors);
router.route('/donor/verified').get(getVerifiedDonors);
router.route('/donor/donated').get(getDonatedDonors);

router.route('/recipient/registered').get(getRegisteredRecipients);
router.route('/recipient/verified').get(getVerifiedRecipients);
router.route('/recipient/received').get(getReceivedRecipients);

module.exports = router;