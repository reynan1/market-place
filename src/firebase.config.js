// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2PL60DMeME3vUEAJlrcGBT5nygQRoiFc",
  authDomain: "house-marketplace-app-6d9ec.firebaseapp.com",
  projectId: "house-marketplace-app-6d9ec",
  storageBucket: "house-marketplace-app-6d9ec.appspot.com",
  messagingSenderId: "704612324816",
  appId: "1:704612324816:web:2c713b685d8e366d6295d5"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

export const db = getFirestore()