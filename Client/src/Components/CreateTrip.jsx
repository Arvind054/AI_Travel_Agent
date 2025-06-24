import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import LoadingTrip from './Loaders/LoadingTrip';
import { createTripAPI } from '../Store/API/tripApi';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import AuthDialog from './Auth/AuthDialog';

const tripCategories = [
  { label: 'Solo', value: 'solo', emoji: '🧑‍🦱' },
  { label: 'Family', value: 'family', emoji: '👨‍👩‍👧‍👦' },
  { label: 'Couple', value: 'couple', emoji: '👩‍❤️‍👨' },
  { label: 'Friends', value: 'friends', emoji: '🧑‍🤝‍🧑' },
];

const budgetOptions = [
  { label: 'Low', value: 'low', emoji: '💸', description: 'Budget Tight' },
  { label: 'Medium', value: 'medium', emoji: '💵', description: 'Pocket Friendly' },
  { label: 'High', value: 'high', emoji: '💰', description: 'Expensive' },
  { label: 'Luxury', value: 'luxury', emoji: '🪙', description: 'Unlimited' },
];

const CreateTrip = () => {
  const [category, setCategory] = useState('solo');
  const [budget, setBudget] = useState('medium');
  const [formData, setFormData] = useState({ category: 'solo', budget: 'medium' });
  const [creatingTrip, setCreatingTrip] = useState(false);
  const navigator = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      setOpenDialog(true);
    }
  }, [isLoggedIn]);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('Please Login to Continue');
    if (!formData['tittle']) return toast.error('Title is Required');
    if (!formData['Source']) return toast.error('Source is Required');
    if (!formData['Destination']) return toast.error('Destination is Required');
    if (!formData['startDate']) return toast.error('Start Date is Required');

    setCreatingTrip(true);
    try {
      const data = { tripDetails: formData, userData: user };
      const tripId = await createTripAPI(data);
      setCreatingTrip(false);
      navigator(`/trip/${tripId}`);
    } catch (err) {
      toast.error('Error Creating Trip. Please Try Again');
      setCreatingTrip(false);
    }
  };

  if (creatingTrip) return <LoadingTrip />;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-indigo-100 font-inter pt-10 pb-10">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h3 className="text-3xl font-bold mb-6 text-indigo-700">Tell us your travel preferences 🏕️🌴</h3>
        <h4 className="text-lg text-gray-600 mb-10">We'll generate a customized itinerary just for you.</h4>

        <form className="space-y-10 w-full" onSubmit={handleSubmit}>
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">Trip Title</label>
            <input type="text" name="tittle" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="e.g. Summer Vacation in Bali" onChange={(e) => handleChange('tittle', e.target.value)} />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">Source</label>
            <input type="text" name="Source" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Your current location" onChange={(e) => handleChange('Source', e.target.value)} />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">Destination</label>
            <input type="text" name="Destination" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="Where are you going?" onChange={(e) => handleChange('Destination', e.target.value)} />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">Number of Days</label>
            <input type="number" min="1" name="No. of Days" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" placeholder="e.g. 5" onChange={(e) => handleChange('No. of Days', e.target.value)} />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">Travel Date</label>
            <input type="date" name="Travel Date" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" onChange={(e) => handleChange('startDate', e.target.value)} />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-800">Return Date <span className="text-sm text-gray-400">(optional)</span></label>
            <input type="date" name="return Date" className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-400" onChange={(e) => handleChange('endDate', e.target.value)} />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-800">Budget</label>
            <div className="flex flex-wrap gap-4">
              {budgetOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`px-6 py-4 rounded-lg border-2 text-center text-base transition-all shadow-sm w-36 ${budget === opt.value ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300 hover:bg-indigo-50'}`}
                  onClick={() => { setBudget(opt.value); handleChange('budget', opt.value); }}
                >
                  <div className="text-3xl">{opt.emoji}</div>
                  <div className="font-semibold mt-1">{opt.label}</div>
                  <div className="text-xs text-gray-500">{opt.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-800">Travel Companions</label>
            <div className="flex flex-wrap gap-4">
              {tripCategories.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  className={`px-6 py-4 rounded-lg border-2 text-center text-base transition-all shadow-sm w-36 ${category === opt.value ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300 hover:bg-indigo-50'}`}
                  onClick={() => { setCategory(opt.value); handleChange('category', opt.value); }}
                >
                  <div className="text-3xl">{opt.emoji}</div>
                  <div className="font-semibold mt-1">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-full shadow-md text-lg transition duration-150">
              Create Trip
            </button>
          </div>
        </form>
      </div>

      {openDialog && <AuthDialog setOpenDialog={setOpenDialog} route={'/create-trip'} />}
    </div>
  );
};

export default CreateTrip;
