// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {getFirestore, collection, getDocs} from "firebase/firestore";
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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const signOutAuthed = () => signOut(auth);

export const signInWithEmailAndPasswordAuthed = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const getStudents = async (userId) => {
  const colRef = collection(db, `users/${userId}/students`);
    // get collection data
    let snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => {
      const student = doc.data();
      student.id = doc.id;
      return student;
    })
}