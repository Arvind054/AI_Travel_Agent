import React, { useState } from 'react';
import Logo from '../assets/Logo.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const navigator = useNavigate();

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img src={Logo} alt="TravelEase Logo" className="h-8 w-auto" />
              <span className="ml-3 text-2xl font-bold text-indigo-700 tracking-wide">
                TravelEase
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-5">
              <button
                onClick={() => navigator("/all-trips")}
                className="rounded-full px-5 py-2 text-base font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-100 transition duration-300"
              >
                My Trips
              </button>
              <button
                onClick={() => { navigator("/create-trip") }}
                className="rounded-full px-5 py-2 text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg transition duration-300"
              >
                + Create Trip
              </button>
              {!isLoggedIn ? (
                <button
                  onClick={() => navigator("/login")}
                  className="rounded-full px-5 py-2 text-base font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-100 transition duration-300"
                >
                  Login
                </button>
              ) : (
                <img
                  src={user.picture}
                  alt="Profile Picture"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer hover:scale-105 transition duration-300 border border-indigo-200"
                />
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
                  viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Line */}
        <div className="h-[1px] bg-gradient-to-r from-indigo-100 via-indigo-300 to-indigo-100"></div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out z-50 font-inter`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-indigo-600 hover:text-indigo-800"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-6 space-y-4">
          <button
            onClick={() => { setIsSidebarOpen(false); navigator("/all-trips") }}
            className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-100 rounded-full transition duration-300"
          >
            My Trips
          </button>
          <button
            onClick={() => { setIsSidebarOpen(false); navigator("/create-trip") }}
            className="block w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-full transition shadow-lg duration-300"
          >
            + Create Trip
          </button>
          {!isLoggedIn ? (
            <button
              onClick={() => { setIsSidebarOpen(false); navigator("/login") }}
              className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-100 rounded-full transition duration-300"
            >
              Login
            </button>
          ) : (
            <div className='flex items-center justify-center gap-4'>
              <img
                src={user.picture}
                alt="Profile Picture"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border border-indigo-300"
              />
              <span className="text-gray-800 font-medium">{user?.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;