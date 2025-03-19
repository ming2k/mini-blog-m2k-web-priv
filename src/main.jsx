import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { reportWebVitals } from './utils/webVitals';
import './index.css'; // Create this file for basic styling

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report web vitals
reportWebVitals(console.log); 