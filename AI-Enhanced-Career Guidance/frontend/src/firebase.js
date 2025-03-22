import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCAQZiVZ8f_i2RLUrzaEO2ysPQKSegJdgo",
  authDomain: "ai-powered-careerrecomendation.firebaseapp.com",
  projectId: "ai-powered-careerrecomendation",
  storageBucket: "ai-powered-careerrecomendation.appspot.com",
  messagingSenderId: "969769213687",
  appId: "1:969769213687:web:ad0e4c1e4376460c96fdf2",
  measurementId: "G-M4FWMN7DDY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, signInWithEmailAndPassword, createUserWithEmailAndPassword };







