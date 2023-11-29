const express = require('express');
const { createDonation } = require('../controllers/donationControllers');
const router = express.Router();

router.route('/create').post(createDonation);

module.exports = router;