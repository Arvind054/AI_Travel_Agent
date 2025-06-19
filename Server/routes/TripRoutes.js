const {Router} = require('express');
const router = Router();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({apiKey:process.env.GOOGLE_GEMINI_API_KEY});

//Create New Trip
router.get('create-trip', async(req, res)=>{
    const tripDetails = req.body;
    try{
        const prompt = `Your are an Helpful Travelling Agent. Use this data of the User and Provide the hotels, and travell sources and places to visit based on the User Budget,\n ${tripDetails}`;
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
          });
        res.json(response);
    }catch(err){
        res.status(401).send('Error Creating Trip');
    }
});
module.exports = router;