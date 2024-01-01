// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJAMk3hBP-RpwgSraRgt7Dh1V8sz194eA",
  authDomain: "jcc-petition.firebaseapp.com",
  projectId: "jcc-petition",
  storageBucket: "jcc-petition.appspot.com",
  messagingSenderId: "799348447778",
  appId: "1:799348447778:web:92ca0bd5b94ad81bec087b",
  measurementId: "G-GMCS4FYG30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Get signatures from Firestore
export const getSignatures = async () => {
  const querySnapshot = await getDocs(collection(db, 'signatures'));
  return querySnapshot.docs.map(doc => doc.data().name);
};

// Save signature to Firestore
export const saveSignature = (name) => {
  addDoc(collection(db, 'signatures'), { name });
};
