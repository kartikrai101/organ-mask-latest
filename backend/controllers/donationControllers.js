const Hospital = require('../models/hospitalModel');
const Donor = require('../models/donorModel');
const Recipient = require('../models/recipientModel');
const Donation = require('../models/donationModel')
const fsPromises = require('fs/promises');
const { Metaplex, mockStorage, toMetaplexFile, keypairIdentity } = require("@metaplex-foundation/js");
const { Keypair, Connection, clusterApiUrl, LAMPORTS_PER_SOL } = require("@solana/web3.js");

const { v4: uuidv4 } = require('uuid');

const main = async (donationData) => {
    const connection = new Connection(clusterApiUrl("devnet"));
    const metaplex = Metaplex.make(connection);
    const pr = [243, 113, 150, 28, 17, 250, 47, 13, 251, 176, 218, 188, 242, 97, 179, 39, 141, 165, 224, 60, 58, 165, 18, 129, 142, 29, 15, 33, 255, 54, 235, 224, 255, 152, 202, 100, 3, 63, 133, 57, 174, 102, 143, 188, 86, 162, 165, 44, 185, 20, 222, 165, 227, 135, 150, 197, 86, 154, 77, 15, 130, 61, 117, 4];
    const wallet = Keypair.fromSecretKey(new Uint8Array(pr));

    metaplex.use(keypairIdentity(wallet));
    metaplex.use(mockStorage());

    console.log("wallet", wallet.publicKey.toBase58());
    console.log("balance", await connection.getBalance(wallet.publicKey));

    const { uri } = await metaplex.nfts().uploadMetadata({
        name: `Donation ID - ${donationData.donationId} Organ Mask`,
        description: "This is a transfer authorised by Organ Mask",
        image: "https://arweave.net/zRzXcV4jsD_-7yUWLA6NcTUhv_CwhBL3MusrI1d97ik",
        symbol: "OrganMask",
        sellerFeeBasisPoints: 500,
    });

    const { nft } = await metaplex.nfts().create({
        uri,
        name: `Donation ID - ${donationData.donationId} Organ Mask`,
        description: "This is a transfer authorised by Organ Mask",
        image: "https://arweave.net/zRzXcV4jsD_-7yUWLA6NcTUhv_CwhBL3MusrI1d97ik",
        symbol: "OrganMask",
        sellerFeeBasisPoints: 500,
    });

    console.log(nft.mint.address.toBase58());
    donationData.blockchainToken = nft.mint.address.toBase58();
    return donationData;
}

exports.createDonation = async (req, res) => {
    try {
        // take all the info from request body and create a donation
        const data = req.body;
        const donationId = uuidv4();

        let donationData = {
            donationId: donationId,
            donorId: data.donorId,
            recipientId: data.recipientId,
            blockchainToken: "sjdnaskhkdjkasar32erwdas"
        }

        donationData = await main(donationData);

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