


//Firebase config you get just from the site



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3JSYpB6ER4yrKjaKfNX6Bix8GtUnnv2g",
  authDomain: "ev-app-9e93f.firebaseapp.com",
  projectId: "ev-app-9e93f",
  storageBucket: "ev-app-9e93f.appspot.com",
  messagingSenderId: "227692838257",
  appId: "1:227692838257:web:0cc576c0ad9e9951f2cad0",
  measurementId: "G-E5EQG3LZZR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
