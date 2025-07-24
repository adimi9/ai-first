// src/firebase.ts

import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, Analytics, isSupported } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC2YbLAYrAgHQSp1RoUhFI8FuZRqr4t6OA",
  authDomain: "aiccelerate-scg.firebaseapp.com",
  projectId: "aiccelerate-scg",
  storageBucket: "aiccelerate-scg.firebasestorage.app",
  messagingSenderId: "316254038483",
  appId: "1:316254038483:web:c81d9b40fba2e82de8e726",
  measurementId: "G-XK30JZ5MEN"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Conditionally initialize Analytics
let analytics: Analytics | undefined;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { db, app, analytics };
