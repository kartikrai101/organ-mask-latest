const dotenv = require('dotenv');
const {Sequelize} = require('sequelize');
dotenv.config();

const postgres = {
    options: {
        username: "postgres",
        host: "localhost",
        database: "organ-trafficking",
        password: "Kartik@2002",
        port: 5432,
        dialect: 'postgres',
        logging: false
    },
    client: null,
}

let sequelize = new Sequelize(postgres.options);

module.exports = sequelize;