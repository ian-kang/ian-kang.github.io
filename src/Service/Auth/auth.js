import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

export default class AuthService {
  login() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  }

  logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  getRedirectResult() {
    const auth = getAuth();
    return getRedirectResult(auth);
  }

  onAuthChange(onUserChange) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      onUserChange(user);
    });
  }
}
