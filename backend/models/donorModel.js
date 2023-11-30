const sequelize = require('../database/connection');
const {Sequelize, DataTypes} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Donor = sequelize.define('donors', {
    donorId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
    },
    contact: {
        type: DataTypes.STRING,
    },
    dob: {
        type: DataTypes.DATE,
    },
    gender: {
        type: DataTypes.STRING
    },
    bloodType: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    medicalHistoryUrl: {
        type: DataTypes.TEXT
    },
    idProofUrl: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.STRING
    },
    donatedOrgan: {
        type: DataTypes.STRING
    },
    donatedOn: {
        type: DataTypes.DATE
    },
    usedOn: {
        type: DataTypes.DATE
    },
    blockchainToken: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.STRING
    },
    secretToken: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true
});

Donor.sync({alter: true})
module.exports = Donor;
