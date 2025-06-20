import React, { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import toast from 'react-hot-toast'
import LoadingTrip from './Loaders/LoadingTrip';
import { createTripAPI } from '../Store/API/tripApi';
import {useNavigate} from 'react-router'

//Trip categories
const tripCategories = [
  { label: 'Solo', value: 'solo', emoji: '🧑‍🦱' },
  { label: 'Family', value: 'family', emoji: '👨‍👩‍👧‍👦' },
  { label: 'Couple', value: 'couple', emoji: '👩‍❤️‍👨' },
  { label: 'Friends', value: 'friends', emoji: '🧑‍🤝‍🧑' },
];

// Trip Budget Options
const budgetOptions = [
  { label: 'Low', value: 'low', emoji: '💸', description: 'Budget Tight' },
  { label: 'Medium', value: 'medium', emoji: '💵', description: 'Pocket Friendly' },
  { label: 'High', value: 'high', emoji: '💰', description: 'Expensive' },
  { label: 'Luxury', value: 'luxury', emoji: '🪙', description: 'Unlimited' },
];




// Create Trip  Page
const CreateTrip = () => {
  const [category, setCategory] = useState('solo');
  const [budget, setBudget] = useState('medium');
 const [formData , setFormData] = useState([]);
 const [creatingTrip, setCreatingTrip] = useState(false);
 const navigator = useNavigate();
 // Handle the Chnages in the user Selection.
 const handleChange = (name, value) => {
  
  console.log(name, value);
  setFormData({ ...formData, [name]:value });
};
//Handle Submit
const handleSubmit = async(e)=>{
  e.preventDefault();
  setFormData({ ...formData, ['budget']:budget, ['category'] :category});
  if(!formData['tittle'] || !formData['Source'] || !!formData['Destination'] || !formData['No. of Days'] || !formData['Travel Date']){
    toast.error('All fields are Required');
    return ;
  }
  setCreatingTrip(true);
  try{
    const tripId = await createTripAPI(formData);
    console.log('trip id is', tripId);
    setCreatingTrip(false);
    navigator(`/trip/${tripId}`);
  }catch(err){
    toast.error('Error Creating Trip. please Try again');
    setCreatingTrip(false);
  }

}
 if(creatingTrip){
  return <LoadingTrip></LoadingTrip>
 }else{
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white-50 font-sans mt-10" style={{fontFamily: 'Inter, Segoe UI, sans-serif'}}>
      <div className="bg-white p-5 rounded-lg  w-full max-w-3xl flex flex-col items-start">
        <h3 className="text-3xl font-bold mb-6 text-left">Tell us your travel preferences 🏕️🌴</h3>
        <h4 className="text-xl mb-10 text-left text-gray-600">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</h4>
        <form className="space-y-10 w-full flex flex-col items-start">
          {/* 0. Trip Title */}
          <div className="w-full">
            <label className="block text-xl font-semibold mb-3 text-gray-800">Trip Title</label>
            <input type="text" className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="e.g. Summer Vacation in Bali" name='tittle' onChange={(e)=>handleChange('tittle', e.target.value)}/>
          </div>

          {/* 1. Destination */}
          <div className="w-full">
            <label className="block text-xl font-semibold mb-3 text-gray-800">What is your destination of choice?</label>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              name = "Source"
              onPlaceSelected={(place) => handleChange('Source',place)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter destination"
            />
          </div>

          {/* 2. Source */}
          <div className="w-full">
            <label className="block text-xl font-semibold mb-3 text-gray-800">What is your source of choice?</label>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
              name = 'Destination'
              onPlaceSelected={(place) => handleChange('Destination',place)}
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter source location"
            />
          </div>

          {/* 3. Number of Days */}
          <div className="w-full">
            <label className="block text-xl font-semibold mb-3 text-gray-800">How many days are you planning your trip?</label>
            <input type="number" min="1" className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" placeholder="e.g. 5" name = 'No. of Days' onChange={(e)=>handleChange('No. of Days', e.target.value)}/>
          </div>

          {/* 4. Travel Date */}
          <div className="w-full">
            <label className="block text-xl font-semibold mb-3 text-gray-800">Travel Date</label>
            <input type="date" className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" name='Travel Date' onChange={(e)=>handleChange('Travel Date', e.target.value)}/>
          </div>

          {/* 5. Return Date (optional) */}
          <div className="w-full">
            <label className="block text-xl font-semibold mb-3 text-gray-800">Return Date <span className='text-gray-400'>(optional)</span></label>
            <input type="date" className="w-full px-4 py-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" name='return Date' onChange={(e)=>handleChange('Return Date', e.target.value)}/>
          </div>

          {/* 6. Budget Selector */}
          <div className="w-full">
            <label className="block text-xl font-semibold mb-3 text-gray-800">What is your budget?</label>
            <div className="flex flex-wrap gap-6">
              {budgetOptions.map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  className={`flex flex-col items-center justify-center px-8 py-5 rounded-xl border-2 transition-all duration-150 shadow-sm text-xl font-semibold cursor-pointer bg-white hover:bg-orange-100 focus:outline-none ${budget === opt.value ? 'border-orange-500 bg-orange-100' : 'border-gray-200'}`}
                  onClick={() => handleChange('budget', opt.value)}
                >
                  <span className="text-4xl mb-2">{opt.emoji}</span>
                  <span>{opt.label}</span>
                  <span className="text-base text-gray-500 mt-1">{opt.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 7. People Category */}
          <div className="w-full">
            <label className="block text-xl font-semibold mb-3 text-gray-800">People with whom you are travelling</label>
            <div className="flex flex-wrap gap-6">
              {tripCategories.map(opt => (
                <button
                  type="button"
                  key={opt.value}
                  className={`flex flex-col items-center justify-center px-8 py-5 rounded-xl border-2 transition-all duration-150 shadow-sm text-xl font-semibold cursor-pointer bg-white hover:bg-orange-100 focus:outline-none ${category === opt.value ? 'border-orange-500 bg-orange-100' : 'border-gray-200'}`}
                  onClick={() => handleChange('category', opt.value)}
                >
                  <span className="text-4xl mb-2">{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-start w-full">
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-12 rounded-full shadow-md text-xl transition duration-150 ease-in-out" onClick={(e)=>handleSubmit(e)}>
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  )
 }

}

export default CreateTrip;