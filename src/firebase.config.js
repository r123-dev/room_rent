// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfTUvomZ6_bKqE5MJc7Ou1zJKR07C_GQM",
  authDomain: "room-f69a7.firebaseapp.com",
  projectId: "room-f69a7",
  storageBucket: "room-f69a7.appspot.com",
  messagingSenderId: "237360066606",
  appId: "1:237360066606:web:3e422b63193da535af6fbf",
  measurementId: "G-4JXR6KHJRB",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
