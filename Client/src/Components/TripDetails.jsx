import React, { useEffect, useState } from 'react';
import FetchingTrip from './Loaders/FetchingTrip';
import toast from 'react-hot-toast';
import { getTripApi } from '../Store/API/tripApi';
import { useParams } from "react-router";
function TripDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [tripDetails, setTripDetails] = useState();
  const getTripDetails = async () => {
    setLoading(true);
    try {
      const response = await getTripApi(id);
      setTripDetails(response);
    } catch (err) {
      toast.error('Error Loading Your Trip. Try Again');
    }
    setLoading(false);
  }
  useEffect(() => {
    getTripDetails();
  }, []);

  if (loading) {
    return (
      <FetchingTrip />
    )
  } else {
    return (
      <div>
      </div>
    )
  }
}

export default TripDetails