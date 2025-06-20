import React, { useEffect, useState } from 'react';

const emojis = ['🌍', '✈️', '🏖️', '🧳', '🗺️', '🏔️', '🚆', '🏕️', '🚢','🌴'];

const LoadingTrip = () => {
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % emojis.length);
      setCurrentEmoji(emojis[index]);
    }, 500);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white text-center p-6">
      <div className="text-6xl animate-bounce mb-4">{currentEmoji}</div>
      <h2 className="text-2xl font-semibold text-gray-700">Creating your perfect trip...</h2>
      <p className="text-gray-500 mt-2">Hang tight, our AI is planning your adventure!</p>
      <div className="w-12 h-12 mt-6 border-4 border-t-orange-400 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingTrip;
