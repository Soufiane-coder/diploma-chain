// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAC-Hie_5wAhhM0IIhuHL3aTnteibCB6BY",
  authDomain: "diploma-chain.firebaseapp.com",
  projectId: "diploma-chain",
  storageBucket: "diploma-chain.appspot.com",
  messagingSenderId: "645181843770",
  appId: "1:645181843770:web:56de61c3881f30a1e90803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signOutAuthed = () => signOut(auth);

export const signInWithEmailAndPasswordAuthed = (email, password) => signInWithEmailAndPassword(auth, email, password);