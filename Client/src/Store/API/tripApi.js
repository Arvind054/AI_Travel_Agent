import axiosInstance from './axiosInstance'
import {createAsyncThunk } from '@reduxjs/toolkit';
//For Creating a Trip
export const createTripAPI = async(data)=>{
   const response = await axiosInstance.get('/create-trip', data);
   return response.data;
}

//For Getting All the Trips of a user
export const getAllTrips = async(data)=>{
    const response = await axiosInstance.get('/all-trips', data);
    return response.data;
}

//For getting a Single Trip
export const getTripApi = async(id) =>{
    const response = await axiosInstance.get('/get-trip', id);
    return response.data;
}