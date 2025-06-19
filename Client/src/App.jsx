import { useState } from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from '../src/Components/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar/><Home/></>,
  },
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
