// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeZGMoJCTFRjp7_bNMG-DQ7v0ilyVztTc",
  authDomain: "cis371-7862f.firebaseapp.com",
  projectId: "cis371-7862f",
  storageBucket: "cis371-7862f.firebasestorage.app",
  messagingSenderId: "372922107530",
  appId: "1:372922107530:web:9dc3503ec39da772454f73",
  measurementId: "G-TBBNR6ZFLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;