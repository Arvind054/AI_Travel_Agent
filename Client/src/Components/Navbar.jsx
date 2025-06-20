import React, { useState } from 'react';
import Logo from '../assets/Logo.svg';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img src={Logo} alt="TravelEase Logo" className="h-8 w-auto" />
              <span className="ml-3 text-2xl font-bold text-gray-800 tracking-tight font-sans">
                TravelEase
              </span>
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/all-trips"
                className="rounded-full px-5 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-100 transition"
              >
                My Trips
              </a>
              <a
                href="/create-trip"
                className="rounded-full px-5 py-2 text-base font-medium bg-orange-500 text-white hover:bg-orange-600 shadow transition"
              >
                + Create Trip
              </a>
              {!isLoggedIn ? (
                <a
                  href="/login"
                  className="rounded-full px-5 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-100 transition"
                >
                  Login
                </a>
              ) : (
                <a
                  href="/profile"
                  className="rounded-full px-5 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-100 transition"
                >
                  Profile
                </a>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md text-gray-600 hover:text-orange-500 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
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
        <div className="h-[1px] bg-gradient-to-r from-orange-100 via-orange-300 to-orange-100"></div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 hover:text-orange-500"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-4 py-6 space-y-4">
          <a
            href="/all-trips"
            onClick={() => setIsSidebarOpen(false)}
            className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-100 rounded-full transition"
          >
            My Trips
          </a>
          <a
            href="/create-trip"
            onClick={() => setIsSidebarOpen(false)}
            className="block w-full px-4 py-2 text-base font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition shadow"
          >
            + Create Trip
          </a>
          {!isLoggedIn ? (
            <a
              href="/login"
              onClick={() => setIsSidebarOpen(false)}
              className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-100 rounded-full transition"
            >
              Login
            </a>
          ) : (
            <a
              href="/profile"
              onClick={() => setIsSidebarOpen(false)}
              className="block w-full px-4 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-100 rounded-full transition"
            >
              Profile
            </a>
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
