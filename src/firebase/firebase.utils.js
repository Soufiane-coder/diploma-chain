// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {getFirestore, collection, getDocs, deleteDoc, doc, updateDoc, addDoc} from "firebase/firestore";
import { query, where } from "firebase/firestore";

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


// getting all the students that belong to an admin
export const getStudents = async (userId) => {
  try{
    const colRef = collection(db, `users/${userId}/studentProfileList`);
      return await getDocPers(colRef, 'studentId');
    }catch(err){
      console.error(err.message);
      return null;
    }
}

export const getUsersId = async () => {
  // get a signle document
  const colRef = collection(db, `users`);
  let snapshot = await getDocs(colRef);
  return snapshot.docs.map((doc) => doc.id);
}


export const getUniversity = async (userId) => {
  // get a signle document
  const colRef = collection(db, `users`);
  const listUniversities = await getDocPers(colRef, "userId");
  return listUniversities.find(item => item.userId === userId)?.university;
}

// deleting documents

export const deleteStudent = async (userId, studentId) => {
  const docRef = doc(db, `users/${userId}/studentProfileList/`, studentId);
  try{
    await deleteDoc(docRef);
  }catch(err){
    console.error(err.message);
  }
}

// updating a document
export const updatingName = async (userId, studentId, updatedProfile) => {
  const docRef = doc(db, `users/${userId}/studentProfileList/`, studentId);
  try{
    await updateDoc(docRef, updatedProfile);
  }catch(err){
    console.error(err.message);
  }
}

// adding a profile to the list of profiles
// that belong to an admin

export const addProfile = async (userId, newProfile) => {
  const colRef = collection(db, `users/${userId}/studentProfileList/`);
  try{
    const res = await addDoc(colRef, newProfile);
    const docRef = doc(db, `users/${userId}/studentProfileList/`, res.id);
    await updateDoc(docRef, {...newProfile, studentId: res.id});
     // update the studentId attribute from "" to the its value
    return res.id;
  }catch(err){
    console.error(err.message);
  }
}
