// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {getFirestore, collection, getDocs, deleteDoc, doc, updateDoc, addDoc} from "firebase/firestore";
import {getDoc } from "firebase/firestore";
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

const getDocPers = async (colRef, typeOfId) => {
  let snapshot = await getDocs(colRef);
    return snapshot.docs.map((doc) => {
      const student = doc.data();
      student[typeOfId] = doc.id;
      return student;
    })
}


// export const getModules = async (userId, studentId, semesterId) => {
//   const colRef = collection(db, `users/${userId}/studentProfileList/${studentId}/semesters/${semesterId}/modules`);
//     // get collection data
//     try{
//       return await getDocPers(colRef, 'id');
//     }catch(err){
//       console.error(err.message);
//       return null;
//     }
// }


// export const getSemesters = async (userId, studentId) => {
//   const colRef = collection(db, `users/${userId}/studentProfileList/${studentId}/semesters`);
//     // get collection data
//     try{
//       return await getDocPers(colRef, 'semester');
//     }catch(err){
//       console.error(err.message);
//       return null;
//     }
// }


export const getStudents = async (userId) => {
  try{
    const colRef = collection(db, `users/${userId}/studentProfileList`);
    // get collection data
      return await getDocPers(colRef, 'studentId');
    }catch(err){
      console.error(err.message);
      return null;
    }
  
}


// deleting documents

export const deleteStudent = async (userId, studentId) => {
  const docRef = doc(db, `users/${userId}/students`, studentId);
  try{
    await deleteDoc(docRef);
  }catch(err){
    console.error(err.message);
  }
}

export const updatingName = async (userId, studentId, updatedProfile) => {
// updating a document
  const docRef = doc(db, `users/${userId}/studentProfileList/`, studentId);
  try{
    await updateDoc(docRef, updatedProfile);
  }catch(err){
    console.error(err.message);
  }
}

export const addProfile = async (userId, newProfile) => {
  // collection ref
  const colRef = collection(db, `users/${userId}/studentProfileList/`);
  // adding collection data
  try{
    const res = await addDoc(colRef, newProfile);
    const docRef = doc(db, `users/${userId}/studentProfileList/`, res.id);
    await updateDoc(docRef, {...newProfile, studentId: res.id}); // update the studentId attribute from "" to the its value
  }catch(err){
    console.error(err.message);
  }
}