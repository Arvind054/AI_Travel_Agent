import axios from 'axios';
import { login } from '../Slice/userSlice';
import  toast  from 'react-hot-toast';

export const getUserProfile = async (tokenInfo, dispatch) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo.access_token}`,
          Accept: 'application/json',
        },
      }
    );

    localStorage.setItem('VerificationToken', JSON.stringify(tokenInfo));

    const userData = response.data;
    dispatch(login(userData)); 
  } catch (error) {
    toast.error('Error Getting Data. Please Login');
    console.error('Error fetching user profile:', error);
  }
};
