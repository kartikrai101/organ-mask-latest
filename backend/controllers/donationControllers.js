const Hospital = require('../models/hospitalModel');
const Donor = require('../models/donorModel');
const Recipient = require('../models/recipientModel');
const Donation = require('../models/donationModel')
const { v4: uuidv4 } = require('uuid');

exports.createDonation = async (req, res) => {
    try{
        // take all the info from request body and create a donation
        const data = req.body;
        const donationId = uuidv4();
        const donationData = {
            donationId: donationId,
            donorId: data.donorId,
            recipientId: data.recipientId,
            blockchainToken: "sjdnaskhkdjkasar32erwdas"
        }

        const response = await Donation.create(donationData);

        // after the donation is created, set the status of donor to donated
        // and status of recipient to received

        const updatedDonor = await Donor.update({status: "donated"}, {
            where: {
                donorId: data.donorId
            }
        })

        const updatedRecipient = await Recipient.update({status: "received"}, {
            where: {
                recipientId: data.recipientId
            }
        })

        res.json({
            success: true,
            message: "Donation created successfully!",
            body: response, updatedDonor, updatedRecipient
        })
    }catch(err){
        res.json({
            success: false,
            message: "Error",
            error: err
        })
    }
}