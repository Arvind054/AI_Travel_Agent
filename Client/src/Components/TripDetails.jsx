import React, { useEffect, useState } from 'react';
import FetchingTrip from './Loaders/FetchingTrip';
import toast from 'react-hot-toast';
import { getTripApi } from '../Store/API/tripApi';
import { useParams } from 'react-router';

function TripDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [tripDetail, setTripDetail] = useState(null);
  const [parsedTrip, setParsedTrip] = useState(null);

  const getTripDetails = async () => {
    setLoading(true);
    try {
      const response = await getTripApi(id);
      setTripDetail(response);

      const raw = response.tripDetails || '';
      const cleanJson = raw.replace(/^```json\n|```$/g, '');
      const parsed = JSON.parse(cleanJson);
      setParsedTrip(parsed);
    } catch (err) {
      toast.error('Error Loading Your Trip. Try Again');
    }
    setLoading(false);
  };

  useEffect(() => {
    getTripDetails();
  }, []);

  if (loading) return <FetchingTrip />;
  if (!parsedTrip) return <p className="text-center mt-10 text-gray-600">No itinerary data found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans text-gray-800">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700 tracking-tight">🌍 Your Travel Itinerary</h1>

      {parsedTrip?.itinerary?.map((day, index) => (
        <div key={index} className="mb-10 bg-white shadow-xl rounded-3xl p-6 border border-gray-200 transition-transform hover:scale-[1.01] duration-300">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">{day?.day}</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">📌 Activities</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              {day?.activities.map((activity, idx) => (
                <li key={idx}>{activity}</li>
              ))}
            </ul>
          </div>

          {/* Hotel Card */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">🏨 Accommodation</h3>
            <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
              <p><span className="font-medium">Name:</span> {day?.accommodation?.name}</p>
              <p><span className="font-medium">Address:</span> {day?.accommodation?.address}</p>
              {day?.accommodation?.rating && <p><span className="font-medium">Rating:</span> ⭐ {day?.accommodation?.rating}</p>}
              <p><span className="font-medium">Price/Night:</span> {day?.accommodation?.price_per_night}</p>

              {day?.accommodation?.amenities?.length > 0 && (
                <div className="mt-3">
                  <p className="font-medium mb-1">✨ Amenities:</p>
                  <div className="flex flex-wrap gap-2">
                    {day.accommodation.amenities.map((amenity, i) => (
                      <span key={i} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm shadow-sm">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <p><strong>🚗 Transportation:</strong> {day.transportation}</p>
            <p><strong>💰 Estimated Cost:</strong> ₹{day.estimated_cost.toLocaleString()}</p>
          </div>
        </div>
      ))}

      {/* Must-Try Food */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-green-700 mb-4">🍱 Must-Try Foods</h2>
        <div className="flex flex-wrap gap-3">
          {parsedTrip.must_try_food.map((food, idx) => (
            <span key={idx} className="bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-sm text-sm">
              {food}
            </span>
          ))}
        </div>
      </div>

      {/* Total Estimated Cost */}
      <div className="mt-10 bg-yellow-100 text-yellow-900 p-6 rounded-2xl text-center font-semibold text-xl shadow-md">
        💸 Total Estimated Cost: ₹{parsedTrip.total_estimated_cost.toLocaleString()}
      </div>
    </div>
  );
}

export default TripDetails;
