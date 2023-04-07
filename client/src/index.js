// Get needed dependencies
import { BrowserRouter as Router} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize the website root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render's the website for the built app
root.render(
  <Router>
    <App />
  </Router>
);
