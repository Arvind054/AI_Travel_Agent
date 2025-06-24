// Trip API Functions 
import axiosInstance from './axiosInstance'

//For Creating a Trip
export const createTripAPI = async(data)=>{
   const response = await axiosInstance.post('/create-trip', data);
   return response.data.data._id;
}
//For Getting All the Trips of a user
export const getAllTrips = async(data)=>{
    const response = await axiosInstance.get('/all-trips', {
        params: data
    });
    return response.data.trips;
}
//For getting a Single Trip
export const getTripApi = async(id) =>{
    const response = await axiosInstance.get(`/get-trip/${id}`);
    const data = response.data;
    return data;
}