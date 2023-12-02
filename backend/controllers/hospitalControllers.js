const Hospital = require('../models/hospitalModel');
const Donor = require('../models/donorModel');
const Recipient = require('../models/recipientModel');
const { v4: uuidv4 } = require('uuid');

exports.loginController = async (req, res) => {
    try{
        const {hospitalId, password} = req.body;

        console.log(hospitalId, password)

        // find that hospital
        const hospital = await Hospital.findOne({
            where: {
                hospitalId: hospitalId,
                password: password
            }
        })

        if(hospital === null){
            res.json({
                success: false,
                message: "Invalid hospital ID or password!"
            })
        }else{
            res.status(200).json({
                success: true,
                message: "Successfully logged in!"
            })
        }
    }catch(err){
        res.status(400).json({
            success: false,
            message: err
        })
    }
}

exports.getRegisteredDonors = async (req, res) => {
    try{
        // fetch all the donors whose status is "registered"
        const registeredDonors = await Donor.findAll({
            where: {
                status: "registered"
            }
        })

        res.status(200).json({
            success: true,
            message: "Successfully fetched list of all registered donors",
            registeredDonors
        })
    }catch(err){
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

exports.getVerifiedDonors = async (req, res) => {
    try{
        const registeredDonors = await Donor.findAll({
            where: {
                status: "verified"
            }
        })

        res.status(200).json({
            success: true,
            message: "Successfully fetched list of all verified donors",
            registeredDonors
        })
    }catch(err){
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

exports.getDonatedDonors = async (req, res) => {
    try{
        const registeredDonors = await Donor.findAll({
            where: {
                status: "donated"
            }
        })

        res.status(200).json({
            success: true,
            message: "Successfully fetched list of all donated donors",
            registeredDonors
        })
    }catch(err){
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

exports.getRegisteredRecipients = async (req, res) => {
    try{
        // fetch all the donors whose status is "registered"
        const registeredRecipients = await Recipient.findAll({
            where: {
                status: "registered"
            }
        })

        res.status(200).json({
            success: true,
            message: "Successfully fetched list of all registered recipients",
            registeredRecipients
        })
    }catch(err){
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

exports.getVerifiedRecipients = async (req, res) => {
    try{
        const verifiedRecipients = await Recipient.findAll({
            where: {
                status: "verified"
            }
        })

        res.status(200).json({
            success: true,
            message: "Successfully fetched list of all verified recipients",
            verifiedRecipients
        })
    }catch(err){
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

exports.getReceivedRecipients = async (req, res) => {
    try{
        const receivedRecipients = await Recipient.findAll({
            where: {
                status: "received"
            }
        })

        res.status(200).json({
            success: true,
            message: "Successfully fetched list of all received recipients",
            receivedRecipients
        })
    }catch(err){
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

exports.getAllDonors = async (req, res) => {
    try{
        const donors = await Donor.findAll();
        res.json({
            success: true,
            body: donors
        })
    }catch(err){
        res.json({
            success: false,
            message: "Error fetching donors"
        })
    }
}

exports.getAllRecipients = async (req, res) => {
    try{
        const recipients = await Recipient.findAll();
        res.json({
            success: true,
            body: recipients
        })
    }catch(err){
        res.json({
            success: false,
            message: "Error fetching recipients"
        })
    }
}