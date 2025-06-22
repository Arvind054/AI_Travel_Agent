import { useState } from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from '../src/Components/Home';
import CreateTrip  from './Components/CreateTrip';
import TripDetails from './Components/TripDetails';
import AllTrips from './Components/AllTrips';
import Login from './Components/Login';
const router = createBrowserRouter([
  {
    path: "/",
    element: <> <Navbar></Navbar><Home/></>,
  },
  {
    path: '/create-trip',
    element: <> <Navbar></Navbar><CreateTrip/></>
  },
  {
   path: '/trip/:id',
   element:  <><Navbar></Navbar><TripDetails/></>
  },
  {
    path: '/all-trips',
    element: <><Navbar></Navbar><AllTrips/></>
  },{
    path: '/login',
    element: <><Navbar></Navbar><Login/></>
  }
]);
function App() {


  return (
    <>
     
      <RouterProvider router={router}></RouterProvider>
      <Footer></Footer>
    </>
  )
}

export default App
