const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors')
const sequelize = require('./database/connection');
dotenv.config();

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json());

const patientRoutes = require('./routes/patientRoutes')
const hospitalRoutes = require('./routes/hospitalRoutes')
const donationRoutes = require('./routes/donationRoutes')

app.use('/api/patient', patientRoutes)
app.use('/api/hospital', hospitalRoutes)
app.use('/api/donation', donationRoutes)

app.listen(8000, () => {
    console.log("Listening to port ", process.env.PORT)
})

try{
    sequelize.authenticate();
    console.log("Connection has been established successfully")
}catch(err){
    console.error("Unable to connnect to the database: ", err)
}