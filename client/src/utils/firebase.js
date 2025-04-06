import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskmanager-df667.firebaseapp.com",
  projectId: "taskmanager-df667",
  storageBucket: "taskmanager-df667.firebasestorage.app",
  messagingSenderId: "189967620334",
  appId: "1:189967620334:web:2696ea822a36d809e67bff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);