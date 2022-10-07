import { initializeApp, getApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBirnaxc5Xlax-4AtnN91vVJ5sXHYagggM",
  authDomain: "whsnxt-chat.firebaseapp.com",
  projectId: "whsnxt-chat",
  storageBucket: "whsnxt-chat.appspot.com",
  messagingSenderId: "252457994021",
  appId: "1:252457994021:web:4e854ccea0e797c6e8fccc",
  measurementId: "G-37JRC3HWQM"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});

export { db, auth };