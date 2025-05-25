// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9hH4bXGl9VWphabAPZo3mJjFpekqg798",
  authDomain: "lab6-b10ef.firebaseapp.com",
  projectId: "lab6-b10ef",
  storageBucket: "lab6-b10ef.appspot.com",
  messagingSenderId: "353519525493",
  appId: "1:353519525493:web:82f90377c2db07b1c2223c",
  measurementId: "G-0KGY6N6BQ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app);


export {db, firebaseConfig, auth }
