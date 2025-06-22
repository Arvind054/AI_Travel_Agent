import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { getUserProfile } from '../Store/API/userApi';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
function Login() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);

  useEffect(()=>{
    if(isLoggedIn){
      navigator('/');
      return ;
    }
  })
  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      await getUserProfile(tokenResponse, dispatch);
      setLoading(false);
      toast.success('Login Successfull');
      navigator('/');
    },
    onError: () => {
      toast.error('Login failed. Please try again.');
      navigator('/');
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm w-full text-center space-y-6">
        <h2 className="text-2xl font-bold text-orange-600">Login / Sign Up</h2>
        <p className="text-gray-700">Continue with your Google account to plan trips.</p>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`bg-white text-black px-4 py-3 rounded-full border border-gray-300 transition flex gap-3 items-center justify-center w-full hover:shadow-md ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <FcGoogle className="text-xl" />
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
}

export default Login;
