const {Router} = require('express');
const router = Router();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GEMINI_API_KEY});
const Trip = require('../models/Trip');
const TripUser = require('../models/User')
//Create New Trip
router.post('/create-trip', async (req, res) => {
    const {tripDetails,userData} = req.body;
   if(!tripDetails){
    res.status(401).json('Please enter trip details');
    return ;
   }
    try {
      const prompt = `
  You are a helpful travel agent. Create a **detailed personalized travel itinerary** from the following details:
  - Source: ${tripDetails.Source}
  - Destination: ${tripDetails.Destination}
  - Start Date: ${tripDetails.startDate}
  - End Date: ${tripDetails.endDate}
  - Budget: ${tripDetails.budget}
  -category: ${tripDetails.category}
  - Preferences: ${tripDetails.preferences || "None"}
  
  Return the response in **strict JSON format** as below:
  {
    "itinerary": [
      {
        "day": "Day 1",
        "activities": ["Activity 1", "Activity 2", "..."],
        "accommodation": {
          "name": "Hotel Name",
          "address": "Address",
          "rating": 4.5,
          "price_per_night": "INR/USD",
          "amenities": ["Free WiFi", "Breakfast", "..."]
        },
        "transportation": "Taxi / Train / Flight / ...",
        "estimated_cost": 100
      },
      ...
    ],
    "total_estimated_cost": 800,
    "must_try_food": ["Dish 1", "Dish 2", "..."]
  }
  ONLY return JSON. Do not include any additional explanation.
  `;
    
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

      const text = response.text;
      const currentTrip = await Trip.create({
        title: tripDetails?.tittle|| "Test Trip",
        source:tripDetails.Source,
        destination: tripDetails.Destination,
        tripDetails: text});
      await currentTrip.save();
      let user = await TripUser.findOne({ email: userData.email });
      if(!user){
        user = await TripUser.create({name: userData.name, email:userData.email});
      }
      user.trips.unshift(currentTrip);
      await user.save();
      res.setHeader('Content-Type', 'application/json');
      res.json({data:currentTrip});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error creating trip itinerary', details: err.message });
    }
  });
  

 // Get All the Trips of the user
router.get('/all-trips', async(req, res)=>{
   const {email} = req.query;
   if(!email){
    res.status(401).send("User Not Found");
    return ;
   }
   try{
       const user = await TripUser.findOne({email: email}).populate('trips');
      res.json(user);
   }catch(err){
      res.status(401).send('Error Getting Your Trips');
   }
});


//Get Details of an Individual Trip
router.get('/get-trip/:id', async(req, res)=>{
  const id = req.params.id
    try{
      const trip = await Trip.findById(id);
      if(!trip){
        res.json("Trip Not Found");
      }
      return res.json(trip);
    }catch(err){
        res.status(401).send('Error Getting Your Trip Data');
        }
})
module.exports = router;