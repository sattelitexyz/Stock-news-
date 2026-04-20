import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtEKnr1dycTB125Y_iSy6oLioZDkpj5AY",
  authDomain: "stock-news-c3f12.firebaseapp.com",
  projectId: "stock-news-c3f12",
  storageBucket: "stock-news-c3f12.firebasestorage.app",
  messagingSenderId: "323380736212",
  appId: "1:323380736212:web:a5d96a3dc2ac8de4c38b41",
};

const app = initializeApp(firebaseConfig);

// ✅ THIS WAS MISSING
export const auth = getAuth(app);
export const db = getFirestore(app);