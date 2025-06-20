import React, { useEffect, useState } from 'react';

const travelEmojis = ['🌍', '🌎', '🌏', '🗺️', '🧳', '✈️'];

const LoadingAllTrips = () => {
  const [emojiIndex, setEmojiIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiIndex((prev) => (prev + 1) % travelEmojis.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-purple-50 to-green-50 text-center px-4">
      <div className="text-6xl mb-4 animate-bounce">
        {travelEmojis[emojiIndex]}
      </div>
      <h2 className="text-2xl font-bold text-gray-700 animate-pulse">
        Loading your past adventures...
      </h2>
      <p className="text-gray-500 mt-2">
        Retrieving your trips and travel memories 📖
      </p>
      <div className="w-10 h-10 mt-6 border-4 border-t-purple-400 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingAllTrips;
