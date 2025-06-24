const {Router} = require('express');
const router = Router();
const {CreateTrip, AllTrips,GetTrip} = require('../controllers/TripControllers');


//Create New Trip
router.post('/create-trip', CreateTrip);
// Get All the Trips of the user
router.get('/all-trips',AllTrips);

//Get Details of an Individual Trip
router.get('/get-trip/:id', GetTrip);

module.exports = router;