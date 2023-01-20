// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH-7LPvX2G_fewPF1eUUAXmjs0ZvW7Uvs",
  authDomain: "menu-949b6.firebaseapp.com",
  projectId: "menu-949b6",
  storageBucket: "menu-949b6.appspot.com",
  messagingSenderId: "134666111267",
  appId: "1:134666111267:web:97ec528a9d2b671c856496",
  measurementId: "G-VEZ61PJKM6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);