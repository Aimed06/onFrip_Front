import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from './Redux/store.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      
      <GoogleOAuthProvider clientId="914924490739-9442gj3hf1kgbsuothop40rsf803f3d9.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </Provider>
    
  </StrictMode>,
)
