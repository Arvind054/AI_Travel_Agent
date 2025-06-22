import axiosInstance from './axiosInstance'
import {createAsyncThunk } from '@reduxjs/toolkit';
//For Creating a Trip
export const createTripAPI = async(data)=>{
   const response = await axiosInstance.post('/create-trip', data);
   console.log('response is ', response.data.data);
   return response.data.data._id;
}
//For Getting All the Trips of a user
export const getAllTrips = async(data)=>{
    const response = await axiosInstance.get('/all-trips', data);
    return response.data;
}

//For getting a Single Trip
export const getTripApi = async(id) =>{
    console.log("Callin fthe Function");
    const response = await axiosInstance.get(`/get-trip/${id}`);
    const data = response.data;
    console.log('data', response.data);
    return data;
}