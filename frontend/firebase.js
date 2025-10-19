// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "yummkart-food-delivery.firebaseapp.com",
  projectId: "yummkart-food-delivery",
  storageBucket: "yummkart-food-delivery.firebasestorage.app",
  messagingSenderId: "1062267871005",
  appId: "1:1062267871005:web:a1767151efb4063ec84bf4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
