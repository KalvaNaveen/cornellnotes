import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyABbmt0awUVZikqDGlR3QfTPgNrj-rfHeo",
    authDomain: "cornell-notes-kn.firebaseapp.com",
    databaseURL: "https://cornell-notes-kn.firebaseio.com",
    projectId: "cornell-notes-kn",
    storageBucket: "cornell-notes-kn.appspot.com",
    messagingSenderId: "859452553768",
    appId: "1:859452553768:web:1685aa6d69e2dc2bc8931d",
    measurementId: "G-CCSDSTK5WP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();



ReactDOM.render(<App />, document.getElementById('cornellNote-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
