import React, { useState } from 'react'
import Logo from '../assets/Logo.svg'
import { useNavigate } from 'react-router'

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigator = useNavigate();

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo and Name */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <img src={Logo} alt="TravelEase Logo" className="h-8 w-auto" />
                <span className="ml-3 text-2xl font-bold text-black tracking-tight font-sans">
                  TravelEase
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                className="rounded-full px-6 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-50 transition duration-150 ease-in-out border border-orange-200"
                onClick={() => { navigator('/my-trips') }}
              >
                My Trips
              </button>
              <button
                className="rounded-full px-6 py-2 text-base font-medium text-white bg-orange-500 hover:bg-orange-600 transition duration-150 ease-in-out shadow-sm"
                onClick={() => { navigator('/create-trip') }}
              >
                + Create Trip
              </button>
              <button
                className="rounded-full px-6 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-50 transition duration-150 ease-in-out border border-orange-200"
                onClick={() => { navigator('/login') }}
              >
                Login
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Separating Line */}
        <div className="h-[0.5px] bg-gradient-to-r from-orange-100 via-orange-300 to-orange-100"></div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        } w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 hover:text-orange-500 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 py-6 space-y-4">
          <button
            onClick={() => { 
              navigator('/my-trips');
              setIsSidebarOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-50 rounded-full transition duration-150 ease-in-out border border-orange-200"
          >
            My Trips
          </button>
          <button
            onClick={() => { 
              navigator('/create-trip');
              setIsSidebarOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-base font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-full transition duration-150 ease-in-out shadow-sm"
          >
            + Create Trip
          </button>
          <button
            onClick={() => { 
              navigator('/login');
              setIsSidebarOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-orange-50 rounded-full transition duration-150 ease-in-out border border-orange-200"
          >
            Login
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar