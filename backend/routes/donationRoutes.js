const express = require('express');
const { createDonation, getAllDonations, getDonation } = require('../controllers/donationControllers');
const router = express.Router();

router.route('/create').post(createDonation);
router.route('/get/all').get(getAllDonations);
router.route('/get/:id').get(getDonation)

module.exports = router;