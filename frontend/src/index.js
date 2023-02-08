import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CarsContextProvider } from './context/carsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <CarsContextProvider>
      <App />
    </CarsContextProvider>
  </React.StrictMode>
);
