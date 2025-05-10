import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './index.css'; // Create this file for basic styling
import { reportWebVitals } from './utils/webVitals';
import { ThemeProvider } from './store/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// Report web vitals
reportWebVitals(console.log); 