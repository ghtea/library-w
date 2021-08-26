import firebaseApp from "firebase/app";
import firebaseAuth from "firebase/auth";
import firebaseFirestore from "firebase/firestore";
import firebaseStorage from "firebase/storage";

export {firebaseApp};
export {firebaseAuth};
export {firebaseFirestore};
export {firebaseStorage};

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

export const myFirebaseApp = firebaseApp.initializeApp(firebaseConfig);
export const myFirebaseAuth = firebaseAuth.getAuth();
