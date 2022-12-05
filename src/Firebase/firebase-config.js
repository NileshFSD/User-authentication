// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3TbKl_YEo8IBosU6ysT5QsemYS4_Xk00",
  authDomain: "user-auth-89c75.firebaseapp.com",
  projectId: "user-auth-89c75",
  storageBucket: "user-auth-89c75.appspot.com",
  messagingSenderId: "110450021515",
  appId: "1:110450021515:web:ca3b71d443aaebc884b08e",
  measurementId: "G-Q88XE1TF5Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
