// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASWX5fiB_CDWCMh1rspSpgwDehulUgUOk",
  authDomain: "constituents-poc.firebaseapp.com",
  projectId: "constituents-poc",
  storageBucket: "constituents-poc.appspot.com",
  messagingSenderId: "850786802834",
  appId: "1:850786802834:web:ac0f4c11ef74342bd05a4b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
