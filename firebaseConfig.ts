// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Якщо потрібно аналітику, можна залишити:
import { getAnalytics } from "firebase/analytics";

// Firebase конфіг
export const firebaseConfig = {
  apiKey: "AIzaSyDeGzckHY9MBmLei7Jz8bqIJD6plSBxcxY",
  authDomain: "wheatherapp-31f96.firebaseapp.com",
  projectId: "wheatherapp-31f96",
  storageBucket: "wheatherapp-31f96.appspot.com",
  messagingSenderId: "754878285535",
  appId: "1:754878285535:web:d436ff04d5a3fd20910b6a",
  measurementId: "G-WPEDZT091F",
};

// Ініціалізація Firebase
const app = initializeApp(firebaseConfig);

// Ініціалізація сервісів Firebase, якщо потрібно
const analytics = getAnalytics(app); // Опціонально
const auth = getAuth(app);
const db = getFirestore(app);

// Експортуй те, що необхідно для використання в інших частинах програми
export { auth, db, app };
