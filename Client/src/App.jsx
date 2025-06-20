import { useState } from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from '../src/Components/Home';
import CreateTrip  from './Components/CreateTrip';
import TripDetails from './Components/TripDetails';
import AllTrips from './Components/AllTrips';
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Home/></>,
  },
  {
    path: '/create-trip',
    element: <><CreateTrip/></>
  },
  {
   path: '/trip/:id',
   element: <TripDetails/>
  },
  {
    path: '/all-trips',
    element: <AllTrips/>
  }
]);
function App() {


  return (
    <>
      <Navbar></Navbar>
      <RouterProvider router={router}></RouterProvider>
      <Footer></Footer>
    </>
  )
}

export default App
