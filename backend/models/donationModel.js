const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const Donation = sequelize.define('donations', {
    donationId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    donorId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    recipientId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    blockchainToken: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true
});

Donation.sync({alter: true});
module.exports = Donation;