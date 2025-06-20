const express = require('express');
const router = express.Router();
const app = express();
require('dotenv').config();
const TripRoutes = require('./routes/TripRoutes');

//For Trip Routes
app.use(express.json());
app.use('/',TripRoutes);

//For User Routes
app.listen(9000, ()=>{
    console.log('App is Listening on Port 9000');
})