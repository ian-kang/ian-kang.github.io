import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updatePassword,
} from "firebase/auth";
export default class FirebaseAuth {
  constructor() {
    this.firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };
  }
  initializeFirebaseApp = () => {
    const firebaseApp = initializeApp(this.firebaseConfig);
    return firebaseApp;
  };
  signInWithRedirect = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  signInWithEmailAndPassword = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  };
  createUserWithEmailAndPassword = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  };
  sendPasswordResetEmail = (email) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  };
  updatePassword = (newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;
    return updatePassword(user, newPassword);
  };
  deleteUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return deleteUser(user);
  };
  signOut = () => {
    const auth = getAuth();
    return signOut(auth);
  };
  getRedirectResult = () => {
    const auth = getAuth();
    return getRedirectResult(auth);
  };
  onAuthStateChanged = (onUserChange) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      onUserChange(user);
    });
  };
}
