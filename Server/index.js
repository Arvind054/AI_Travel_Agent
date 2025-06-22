const express = require('express');
const router = express.Router();
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const TripRoutes = require('./routes/TripRoutes');

//Mongo DB Connection 
dbConnection()
.then(console.log("DB connected successfully✅"))
.catch((e)=> console.log("Error Occured ", e));
async function dbConnection(){
    await mongoose.connect(process.env.MONGODB_URL);
}

//For Trip Routes
app.use(cors());
app.use(express.json());
app.use('/',TripRoutes);

//For User Routes
app.listen(9000, ()=>{
    console.log('App is Listening on Port 9000');
})