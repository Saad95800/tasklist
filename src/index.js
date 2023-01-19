import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'
import {store} from './redux/store'
import {Provider} from 'react-redux'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyC-4EB08AQBc8aZGcfGeTRdSQBPl1NfUwQ",
  authDomain: "tasklist-38ae6.firebaseapp.com",
  projectId: "tasklist-38ae6",
  storageBucket: "tasklist-38ae6.appspot.com",
  messagingSenderId: "894648703449",
  appId: "1:894648703449:web:08040bce40b48d3e9fe1c8",
  measurementId: "G-7S66BDEMDS"
};

firebase.initializeApp(firebaseConfig)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( // Permet de mettre à jour le dom avec nos composants react, affiche le composant App dans la div d'id root
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
