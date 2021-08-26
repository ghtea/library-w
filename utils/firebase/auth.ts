import {firebaseAuth, myFirebaseAuth} from "./global"

// ref
// https://firebase.google.com/docs/reference/node/firebase.auth.GoogleAuthProvider?authuser=0

// listen auth change
// https://firebase.google.com/docs/reference/node/firebase.auth.Auth?authuser=0#onauthstatechanged

// check current user
// https://firebase.google.com/docs/reference/node/firebase.auth.Auth?authuser=0#currentuser


const {signInWithPopup, GoogleAuthProvider} = firebaseAuth;

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithPopupByGoogle = async () => {
  try {
    const result = await signInWithPopup(myFirebaseAuth, googleAuthProvider)

    // const credential = GoogleAuthProvider.credentialFromResult(result);

    // const user = result.user;
    // const token = credential?.accessToken;
  }
  catch(error) {
    console.log(error)
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // // The email of the user's account used.
    // const email = error.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
  }
}

export const useOnAuthStateChanged = () => {
  myFirebaseAuth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log("User is signed in: ", user)

    }
  });
}
