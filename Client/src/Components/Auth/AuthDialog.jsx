import React from 'react'
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { getUserProfile } from '../../Store/API/userApi';
import { useNavigate } from 'react-router';
function AuthDialog({setOpenDialog, route}) {
    const navigator = useNavigate();
      const dispatch = useDispatch();
    const handleLogin =  useGoogleLogin({
        onSuccess: tokenResponse => {getUserProfile(tokenResponse,dispatch); navigator(`/${route}`)},
        onError: tokenResponse =>{toast.error('Error Occured'); navigator('/')}
      });
  return (
    <div className="fixed inset-0 bg-black/50  bg-opacity-90 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center space-y-4">
      <h2 className="text-xl font-semibold text-orange-600">Login/SignUp to Continue</h2>
      <p className="text-gray-700">You need to be logged in to create a trip.</p>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="bg-white text-black px-4 py-2 rounded-full border border-gray-300 transition flex gap-3 items-center justify-center hover:shadow-md"
          onClick={handleLogin}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
        <button
          className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition"
          onClick={() => setOpenDialog(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default AuthDialog