const Hospital = require('../models/hospitalModel');
const Donor = require('../models/donorModel');
const Recipient = require('../models/recipientModel');
const Donation = require('../models/donationModel')
const fsPromises = require('fs/promises');
const nodemailer = require('nodemailer');
require('dotenv').config();
const { Metaplex, irysStorage, toMetaplexFile, keypairIdentity } = require("@metaplex-foundation/js");
const { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL } = require("@solana/web3.js");

const { v4: uuidv4 } = require('uuid');

const main = async (donationData) => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const metaplex = Metaplex.make(connection);
    const pr = [243, 113, 150, 28, 17, 250, 47, 13, 251, 176, 218, 188, 242, 97, 179, 39, 141, 165, 224, 60, 58, 165, 18, 129, 142, 29, 15, 33, 255, 54, 235, 224, 255, 152, 202, 100, 3, 63, 133, 57, 174, 102, 143, 188, 86, 162, 165, 44, 185, 20, 222, 165, 227, 135, 150, 197, 86, 154, 77, 15, 130, 61, 117, 4];
    const wallet = Keypair.fromSecretKey(new Uint8Array(pr));

    metaplex.use(keypairIdentity(wallet));
    metaplex.use(irysStorage({
        address: 'https://devnet.irys.xyz',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
    }));
    console.log("wallet", wallet.publicKey.toBase58());
    console.log("balance", await connection.getBalance(wallet.publicKey));

    const { uri } = await metaplex.nfts().uploadMetadata({
        name: `Donation ID Organ Mask`,
        attributes: [
            {
                trait_type: "Donation ID",
                value: donationData.donationId
            },
            {
                trait_type: "Donor ID",
                value: donationData.donorId
            },
            {
                trait_type: "Recipient ID",
                value: donationData.recipientId
            },
            {
                trait_type: "Blockchain Token",
                value: donationData.blockchainToken
            }
        ],
        description: "This is a transfer authorised by Organ Mask",
        image: "https://arweave.net/zRzXcV4jsD_-7yUWLA6NcTUhv_CwhBL3MusrI1d97ik",
        symbol: "OrganMask",
    });

    console.log("uri", uri);

    const { nft } = await metaplex.nfts().create({
        uri,
        name: `Donation ID Organ Mask`,
        description: "This is a transfer authorised by Organ Mask",
        image: "https://av3tgtfdokzx7ofkgjgn3bnjtqfymypaeldxckxsv5pozt4no72a.arweave.net/BXczTKNys3-4qjJM3YWpnAuGYeAix3Eq8q9e7M-Nd_Q",
        symbol: "OrganMask",
        sellerFeeBasisPoints: 500,
    },
        { commitment: "finalized" }
    );

    console.log("nft", nft, "\n\n");

    console.log(nft.mint.address.toBase58());

    donationData.blockchainToken = nft.mint.address.toBase58();
    return donationData;
}

exports.createDonation = async (req, res) => {
    try {
        // take all the info from request body and create a donation
        console.log("this is working")
        const data = req.body;
        const donationId = uuidv4();

        //fetch the donor details
        // const donorDetails = await Donor.findOne({
        //     where: {
        //         donorId: data.donorId
        //     }
        // })

        //const email = donorDetails.data.body.email;

        let donationData = {
            donationId: donationId,
            donorId: data.donorId,
            recipientId: data.recipientId,
            blockchainToken: "sjdnaskhkdjkasar32erwdas"
        }

        donationData = await main(donationData);

        console.log(donationData)

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth:{
        //         user: 'kartikrai0912@gmail.com',
        //         pass: process.env.NODEMAILER_PASSWORD
        //     }
        // });
        // const mailOptions = {
        //     from: 'kartikrai0912@gmail.com',
        //     to: email,
        //     subject: "Access link from Organ Mask",
        //     html: `<div>
        //             <p>Your donated organ has been successfully transferred to a recipient!</p> 
        //             <p>Here is your NFT link through which you can always check the donation information that has been made by you. <a href='https://explorer.solana.com/address/${donationData.blockchainToken}?cluster=devnet'><b>Access Link</b></a></p> 
        //             <p>Click <a href="https://organ-mask-information.vercel.app/donation/info">here</a> to know more about your donation process.</p>
        //         </div>`
        // }
        // transporter.sendMail(mailOptions, (err, info) => {
        //     if(err){
        //         console.log(err)
        //     }else{
        //         console.log("Email has been sent!", info.response)
        //     }
        // })

        const response = await Donation.create(donationData);

        // after the donation is created, set the status of donor to donated
        // and status of recipient to received

        const updatedDonor = await Donor.update({ status: "donated" }, {
            where: {
                donorId: data.donorId
            }
        })

        const updatedRecipient = await Recipient.update({ status: "received" }, {
            where: {
                recipientId: data.recipientId
            }
        })

        res.json({
            success: true,
            message: "Donation created successfully!",
            body: response, updatedDonor, updatedRecipient
        })
    } catch (err) {
        res.json({
            success: false,
            message: "Error",
            error: err
        })
    }
}

exports.getDonation = async (req, res) => {
    try{
        const donationId = req.params.id;
        const response = await Donation.findOne({
            where: {
                donationId: donationId
            }
        })

        if(response === null){
            return res.json({
                success: false,
                message: "This donation does not exit"
            })
        }else{
            return res.json({
                success: true,
                message: "Successfully fetched donation",
                body: response
            })
        }
    }catch(err){
        res.json({
            success: false,
            message: "Could not get this donation"
        })
    }
}

exports.getAllDonations = async (req, res) => {
    try{
        const response = await Donation.findAll();
        res.json({
            success: true,
            message: "Fetched all donations successfully!",
            body: response
        })
    }catch(err){
        res.json({
            success: false,
            message: "Could not fetch donations"
        })
    }
}