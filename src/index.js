import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDvrnooTcwYsfxBKgylDwKFLjPg3VledF8",
  authDomain: "waiot-2.firebaseapp.com",
  projectId: "waiot-2",
  storageBucket: "waiot-2.appspot.com",
  messagingSenderId: "284996250288",
  appId: "1:284996250288:web:9b4f9749ee6cab59f12975"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);

serviceWorkerRegistration.register();

