import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './Store/store.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
    <Toaster/>
    <App /> 
    </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
