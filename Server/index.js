const express = require('express');
const router = express.Router();
const app = express();
const TripRoutes = require('./routes/TripRoutes');

//For Trip Routes
router.get('/', TripRoutes);

//For User Routes
app.use(router);
app.listen(9000, ()=>{
    console.log('App is Listening on Port 9000');
})