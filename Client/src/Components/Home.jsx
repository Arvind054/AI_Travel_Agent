import React, { useEffect, useState } from 'react';
import HomeImage from '../assets/HomeImage.png';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../Store/API/userApi';
import AuthDialog from './Auth/AuthDialog';

const Home = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isLoggedIn) return;
    const tokenInfo = JSON.parse(localStorage.getItem('VerificationToken'));
    if (tokenInfo) {
      getUserProfile(tokenInfo, dispatch);
    }
  }, []);

  const handleCreateTrip = () => {
    if (!isLoggedIn) {
      setOpenDialog(true);
      return;
    }
    navigator('/create-trip');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-violet-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col items-center">

          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Plan Your Next Journey
              <span className="text-indigo-500 block md:inline md:ml-2">With AI</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
              Your Personal AI Trip Planner 🏖️
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Your smart travel assistant curating custom itineraries based on your preferences and budget.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transform hover:scale-105 transition duration-300 shadow-xl"
              onClick={handleCreateTrip}
            >
              Get Started for Free ✈️
            </button>
            <button className="px-8 py-4 bg-white text-indigo-700 text-lg font-semibold rounded-full border-2 border-indigo-500 hover:bg-indigo-50 transform hover:scale-105 transition duration-300 shadow-md">
              View Sample Trips 🗽
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 w-full max-w-4xl">
            {[
              { icon: "🚀", title: "Smart Planning", desc: "AI-powered itinerary creation" },
              { icon: "💰", title: "Budget Friendly", desc: "Cost-effective travel plans" },
              { icon: "🎯", title: "Personalized", desc: "Tailored to your preferences" },
              { icon: "⚡", title: "Quick & Easy", desc: "Plan trips in minutes" }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 border-t-4 border-indigo-300">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Authentication Dialog */}
      {openDialog && (
        <AuthDialog setOpenDialog={setOpenDialog} route={'create-trip'} />
      )}
    </div>
  );
};

export default Home;
