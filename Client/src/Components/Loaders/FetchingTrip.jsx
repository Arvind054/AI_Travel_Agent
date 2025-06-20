import React, { useEffect, useState } from 'react';

const emojis = ['🧭', '📍', '🌐', '🗺️', '⛺', '🛫', '🧳', '🏝️'];

const FetchingTrip = () => {
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % emojis.length);
      setCurrentEmoji(emojis[index]);
    }, 400);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-orange-50 text-center">
      <div className="text-6xl animate-bounce mb-4">{currentEmoji}</div>
      <h2 className="text-2xl font-semibold text-gray-700 animate-pulse">
        Fetching your trip details...
      </h2>
      <p className="text-gray-500 mt-2">Loading itinerary, destinations, and memories 📦</p>
      <div className="w-10 h-10 mt-6 border-4 border-t-blue-400 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default FetchingTrip;
