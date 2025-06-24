import React, { useEffect, useState } from 'react';
import LoadingAllTrips from './Loaders/LoadingAllTrips';
import { getAllTrips } from '../Store/API/tripApi';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { getUserProfile } from '../Store/API/userApi';
import { useDispatch } from 'react-redux';
import AuthDialog from './Auth/AuthDialog'
const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state)=>state.user.user);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    if(!isLoggedIn){
       setOpenDialog(true);
       return ;
    }
    const fetchTrips = async () => {
      try {
         const userData = user
        const data = await getAllTrips(userData);
        setTrips(data);
      } catch (err) {
        console.error("Failed to fetch trips:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  },  []);
  if(!isLoggedIn)return <AuthDialog setOpenDialog={setOpenDialog} route={"all-trips"}/>;
  if (loading) return <LoadingAllTrips />;
   
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 px-6 py-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        ✈️ Your Planned Trips
      </h2>

      {trips.length === 0 ? (
        <div className="w-full h-[50vh] flex flex-col justify-center items-center text-center bg-white/60 rounded-xl p-6 shadow-inner">
          <div className="text-6xl mb-4 animate-bounce">🧳</div>
          <h2 className="text-2xl font-bold text-gray-700">Oops! No trips yet...</h2>
          <p className="text-gray-500 mt-2 max-w-md">
            Looks like your suitcase is still empty. Let’s plan your first adventure! 🌍✈️
          </p>
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-105 transition-all duration-200 shadow-md"
            onClick={() => navigate('/create-trip')}
          >
            Create Your First Trip
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <li
              key={trip._id}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => navigate(`/trip/${trip._id}`)}
            >
              <h3 className="text-xl font-semibold text-blue-800">{trip.title}</h3>
              <p className="text-md text-green-600 m-2">
                {trip.source} - {trip.destination}
              </p>
              <p className="text-sm text-gray-600 m-2">
                {trip.createdAt?.slice(0,10)}
              </p>
              <div className="mt-3 text-sm text-gray-500">
                { "Click to View"}
              </div>
            </li>
          ))}
        </ul>
      )}
      {openDialog && (
        <AuthDialog setOpenDialog={setOpenDialog} route={"all-trips"}/>
      )}
    </div>
  );
};

export default AllTrips;
