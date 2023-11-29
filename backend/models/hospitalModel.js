const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../database/connection');

const Hospital = sequelize.define('hospitals', {
    hospitalId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

Hospital.sync({alter: true});
module.exports = Hospital;