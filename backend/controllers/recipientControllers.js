const { v4: uuidv4 } = require('uuid');
const Recipient = require('../models/recipientModel');

exports.registerRecipient = async (req, res) => {
    try{
        // add this user to donor table
        const data = req.body;
        const recipientId = uuidv4();
        const recipientData = {
            recipientId: recipientId, fname: data.fname, lname: data.lname, password: data.password,
            email: data.email, contact: data.contact, dob: data.dob, gender: data.gender, 
            bloodType: data.bloodType, state: data.state, address: data.address,
            medicalHistoryUrl: data.medicalHistoryUrl, status: data.status, requestedOrgan: data.requestedOrgan,  blockchainToken: "-NA-"
        }

        // insert this donor in the database
        const newRecipient = await Recipient.create(recipientData);

        res.json({
            success: true,
            message: "Recipient successfully registered!",
            body: newRecipient
        })
    }catch(err){
        res.json({
            success: false,
            message: err
        })
    }
}

exports.getRecipientDetails = async (req, res) => {
    try{
        // take the donor id from params and present the donor details
        const recipientId = req.params.id;
        const recipient = await Recipient.findOne({
            where: {
                recipientId: recipientId
            }
        })

        if(recipient === null){
            return res.json({
                success: false,
                message: "invalid id"
            })
        }else{
            return res.json({
                success: true,
                body: recipient
            })
        }
    }catch(err){
        res.json({
            success: false,
            err
        })
    }
}

exports.updateRecipientDetails = async (req, res) => {
    const recipientId = req.params.id;
    // update the info of this donor
    const newStatus = req.body.status;

    const updatedInfo = await Recipient.update({status: newStatus}, {
        where: {
            recipientId: recipientId
        }
    })

    res.json({
        success: true,
        message: "Status updated successfully",
        body: updatedInfo
    })
}

exports.searchRecipient = async (req, res) => {
    const data = req.body;

    const recipients = await Recipient.findAll({
        where: {
            requestedOrgan: data.organ,
            bloodType: data.bloodType,
            status: data.status
        }
    })

    res.json({
        success: true,
        body: recipients
    })
}

// exports.getRegisteredRecipients = async (req, res) => {
//     try{
//         // fetch all the donors whose status is "registered"
//         const registeredRecipients = await Recipient.findAll({
//             where: {
//                 status: "registered"
//             }
//         })

//         res.status(200).json({
//             success: true,
//             message: "Successfully fetched list of all registered recipients",
//             registeredRecipients
//         })
//     }catch(err){
//         res.status(401).json({
//             success: false,
//             message: err
//         })
//     }
// }

// exports.getVerifiedRecipients = async (req, res) => {
//     try{
//         const verifiedRecipients = await Recipient.findAll({
//             where: {
//                 status: "verified"
//             }
//         })

//         res.status(200).json({
//             success: true,
//             message: "Successfully fetched list of all verified recipients",
//             verifiedRecipients
//         })
//     }catch(err){
//         res.status(401).json({
//             success: false,
//             message: err
//         })
//     }
// }

// exports.getReceivedRecipients = async (req, res) => {
//     try{
//         const receivedRecipients = await Recipient.findAll({
//             where: {
//                 status: "received"
//             }
//         })

//         res.status(200).json({
//             success: true,
//             message: "Successfully fetched list of all received recipients",
//             receivedRecipients
//         })
//     }catch(err){
//         res.status(401).json({
//             success: false,
//             message: err
//         })
//     }
// }