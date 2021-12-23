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

    return signInWithRedirect(auth, provider);
  }

  logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  getResult() {
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
