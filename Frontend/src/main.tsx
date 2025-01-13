import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GeolocationProvider } from './GeolocationContext';
import './main.css';
const container = document.getElementById('root');
const root = createRoot(container!);
document.documentElement.classList.add('dark');
root.render(
  <React.StrictMode>
    <GeolocationProvider>
      <App />
    </GeolocationProvider>
  </React.StrictMode>
);