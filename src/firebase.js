// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpPaxfbpOuCgnANAQHUZ_Hu-BxibdgD2I",
  authDomain: "lab4todo.firebaseapp.com",
  projectId: "lab4todo",
  storageBucket: "lab4todo.firebasestorage.app",
  messagingSenderId: "1021771663937",
  appId: "1:1021771663937:web:1cecc17d176b12698994c0",
  measurementId: "G-99K8LZR2CZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
export default db;
