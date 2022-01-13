// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  addDoc,
  updateDoc,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
// to be deleted
// const test = doc(firestore, "guests/test1");

// function writeTest() {
//   const docData = {
//     firstName: "Jane",
//     lastName: "Doe",
//     email: "jane@doe.com",
//     phoneNumber: 6476476471,
//   };
//   setDoc(test, docData, { merge: true });
// }

// writeTest();

// const testCollection = collection(firestore, "guests");

// export async function addTest() {
//   const newTest = await addDoc(testCollection, {
//     firstName: "John",
//     lastName: "Smith",
//     email: "john@smit.com",
//     phoneNumber: 6475556471,
//   });
//   console.log("created", newTest.path);
// }

// addTest();
