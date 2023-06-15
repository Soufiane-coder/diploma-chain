// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {getFirestore, collection, getDocs, deleteDoc, doc, getDoc} from "firebase/firestore";
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


export const getModules = async (userId, studentId, semesterId) => {
  const colRef = collection(db, `users/${userId}/studentProfileList/${studentId}/semesters/${semesterId}/modules`);
    // get collection data
    return await getDocPers(colRef, 'id');
}


export const getSemesters = async (userId, studentId) => {
  const colRef = collection(db, `users/${userId}/studentProfileList/${studentId}/semesters`);
    // get collection data
    return await getDocPers(colRef, 'semester');
}


export const getStudents = async (userId) => {
  try{
    const colRef = collection(db, `users/${userId}/studentProfileList`);
    // get collection data
      const students = await getDocPers(colRef, 'studentId');
      students.forEach(async student => {
        student.semesters = await getSemesters(userId, student.studentId);
        student.semesters.forEach(async semester => {
            semester.modules = await getModules(userId, student.studentId, semester.semester);
        })})
        return students;
    }catch(err){
      console.error(err.message);
      return null;
    }
  
}


// deleting documents

export const deleteStudent = (userId, studentId) => {
  const docRef = doc(db, `users/${userId}/students`, studentId);
  deleteDoc(docRef)
    .then((res) => {
      console.log(res, "deleted");
    })
    .catch((err) => console.error(err.message));
}