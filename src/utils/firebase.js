// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChyxsajTCdA6EB1Jxo5E1KZa1iOevsrBI",
  authDomain: "netflixgpt-e016f.firebaseapp.com",
  projectId: "netflixgpt-e016f",
  storageBucket: "netflixgpt-e016f.firebasestorage.app",
  messagingSenderId: "731034728716",
  appId: "1:731034728716:web:ea7f72043a9971286db129",
  measurementId: "G-KV182Q0M1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

export const auth = getAuth();