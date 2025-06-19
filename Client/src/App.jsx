import { useState } from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from '../src/Components/Home';
import CreateTrip  from './Components/CreateTrip';
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Home/></>,
  },
  {
    path: '/create-trip',
    element: <><CreateTrip/></>
  },
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
