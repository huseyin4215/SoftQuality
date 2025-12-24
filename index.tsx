
import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import './index.css';
=======
>>>>>>> 848559c3172931f9e3b3259088c5b6925df13755
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root elemanı bulunamadı.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
