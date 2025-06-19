import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300">
      <div className="flex flex-col items-center">
        {/* Animated Car SVG */}
        <div className="mb-8 animate-bounce">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="80" height="20" rx="8" fill="#FFA500" />
            <rect x="35" y="20" width="50" height="20" rx="6" fill="#FFB347" />
            <circle cx="35" cy="55" r="8" fill="#444" />
            <circle cx="85" cy="55" r="8" fill="#444" />
            <circle cx="35" cy="55" r="4" fill="#fff" />
            <circle cx="85" cy="55" r="4" fill="#fff" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-orange-700 mb-2 font-sans">Loading your trip details...</h2>
        <p className="text-lg text-orange-600 font-medium font-sans">Please wait while we plan your adventure!</p>
      </div>
    </div>
  );
};

export default Loading; 