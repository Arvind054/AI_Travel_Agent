const {Router} = require('express');
const router = Router();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({apiKey: process.env.GOOGLE_GEMINI_API_KEY});

//Create New Trip
router.get('/create-trip', async(req, res)=>{
    const tripDetails =  JSON.stringify(req.body);
    try{
        const prompt = `Your are an Helpful Travelling Agent. Create a personalized travel itinerary from Given Source to Destination. The travel dates are also provided. Output the plan in JSON format including daily itinerary, accommodations, transportation, estimated cost, and must-try food.,\n ${tripDetails}`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
          });
        res.json(response.text);
    }catch(err){
        res.status(401).send('Error Creating Trip', err);
    }
});

 // Get All the Trips of the user
router.get('/all-trips', async(req, res)=>{
   const userId = req.body;
   try{

   }catch(err){
      res.status(401).send('Error Getting Your Trips');
   }
});


//Get Details of an Individual Trip
router.get('/get-trip', async(req, res)=>{
    const tripid = req.body;
    try{
      
    }catch(err){
        res.status(401).send('Error Getting Your Trip Data');
        }
})
module.exports = router;