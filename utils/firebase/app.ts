import * as firebaseApp from "firebase/app";
import * as firebaseAuth from "firebase/auth";

if (typeof window !== "undefined" && !firebaseApp.getApps().length) {
  firebaseApp.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_APP_ID
  });
  firebaseAuth.setPersistence(firebaseAuth.getAuth(), firebaseAuth.browserLocalPersistence)
}

export {firebaseApp};