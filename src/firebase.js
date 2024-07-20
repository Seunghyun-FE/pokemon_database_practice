// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzA1hZVHPVXrHvvTLEAioX8R2qyWZUQKE",
  authDomain: "react-poke-app-1ba6a.firebaseapp.com",
  projectId: "react-poke-app-1ba6a",
  storageBucket: "react-poke-app-1ba6a.appspot.com",
  messagingSenderId: "947901912452",
  appId: "1:947901912452:web:60d2bcf928967a427e79d1",
  measurementId: "G-MP0VYEHTTZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;
