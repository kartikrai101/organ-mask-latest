const sequelize = require('../database/connection');
const {Sequelize, DataTypes} = require('sequelize');

const Recipient = sequelize.define('recipients', {
    recipientId: {
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
    requestedOrgan: {
        type: DataTypes.STRING
    },
    requestedOn: {
        type: DataTypes.DATE
    },
    recievedOn: {
        type: DataTypes.DATE
    },
    blockchainToken: {
        type: DataTypes.TEXT
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

Recipient.sync({alter: true})
module.exports = Recipient;
