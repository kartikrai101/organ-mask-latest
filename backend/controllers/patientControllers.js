const { v4: uuidv4 } = require('uuid');
const Donor = require('../models/donorModel');
const Recipient = require('../models/recipientModel')

exports.registerDonor = async (req, res) => {
    try{
        // add this user to donor table
        const data = req.body;
        const donorId = uuidv4();
        const donorData = {
            donorId: donorId, fname: data.fname, lname: data.lname, password: data.password,
            email: data.email, contact: data.contact, dob: data.dob, gender: data.gender, 
            bloodType: data.bloodType, state: data.state, address: data.address,
            medicalHistoryUrl: data.medicalHistoryUrl, idProofUrl: data.idProofUrl, status: data.status, donatedOrgan: data.donatedOrgan,  blockchainToken: "-NA-"
        }

        // insert this donor in the database
        const newDonor = await Donor.create(donorData);

        res.json({
            success: true,
            message: "Donor successfully registered!",
            newDonor
        })
    }catch(err){
        res.status(401).json({
            success: false,
            message: err
        })
    }
}

exports.login = async (req, res) => {
    try{
        const {email, password} = req.body;
        // match this with the existing user in database
        const patientData1 = await Donor.findOne({
            where: {
                email: email,
                password: password
            }
        })

        const patientData2 = await Recipient.findOne({
            where: {
                email: email,
                password: password
            }
        })

        if(patientData1 === null && patientData2 === null){
            return res.json({
                success: false,
                message: "invalid email or password"
            })
        }

        if(patientData1 === null)
            return res.json({
                success: true,
                message: "login successfull!",
                body: patientData2,
                role: "recipient"
            })

        res.json({
            success: true,
            message: "login successfull!",
            body: patientData1,
            role: "donor"
        })
    }catch(err){
        res.json({
            success: false,
            message: "Error occured",
            err
        })
    }
}  

exports.getDonorDetails = async (req, res) => {
    try{
        // take the donor id from params and present the donor details
        const donorId = req.params.id;
        const donor = await Donor.findOne({
            where: {
                donorId: donorId
            }
        })

        if(donor === null){
            res.json({
                success: false,
                message: "invalid id"
            })
        }else{
            res.json({
                success: true,
                body: donor
            })
        }
    }catch(err){
        res.json({
            success: false,
            err
        })
    }
}

exports.updateDonorDetails = async (req, res) => {
    const donorId = req.params.id;
    // update the info of this donor
    const newStatus = req.body.status;

    const updatedInfo = await Donor.update({status: newStatus}, {
        where: {
            donorId: donorId
        }
    })

    res.json({
        success: true,
        message: "Status updated successfully",
        body: updatedInfo
    })
}

// exports.getRegisteredDonors = async (req, res) => {
//     try{
//         // fetch all the donors whose status is "registered"
//         const registeredDonors = await Donor.findAll({
//             where: {
//                 status: "registered"
//             }
//         })

//         res.status(200).json({
//             success: true,
//             message: "Successfully fetched list of all registered donors",
//             registeredDonors
//         })
//     }catch(err){
//         res.status(401).json({
//             success: false,
//             message: err
//         })
//     }
// }

// exports.getVerifiedDonors = async (req, res) => {
//     try{
//         const registeredDonors = await Donor.findAll({
//             where: {
//                 status: "verified"
//             }
//         })

//         res.status(200).json({
//             success: true,
//             message: "Successfully fetched list of all verified donors",
//             registeredDonors
//         })
//     }catch(err){
//         res.status(401).json({
//             success: false,
//             message: err
//         })
//     }
// }

// exports.getDonatedDonors = async (req, res) => {
//     try{
//         const registeredDonors = await Donor.findAll({
//             where: {
//                 status: "donated"
//             }
//         })

//         res.status(200).json({
//             success: true,
//             message: "Successfully fetched list of all donated donors",
//             registeredDonors
//         })
//     }catch(err){
//         res.status(401).json({
//             success: false,
//             message: err
//         })
//     }
// }