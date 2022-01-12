export default class AuthService {
  constructor(authProvider) {
    this.authProvider = authProvider;
  }
  googleSignInWithRedirect() {
    this.authProvider.logInWithRedirect();
  }
  signInWithEmailPassword(email, password) {
    return this.authProvider.signInWithEmailAndPassword(email, password);
  }
  createUserWithEmailAndPassword(email, password) {
    return this.authProvider.createUserWithEmailAndPassword(email, password);
  }
  sendPasswordResetEmail(email) {
    return this.authProvider.sendPasswordResetEmail(email);
  }

  logout() {
    return this.authProvider.signOut();
  }

  getRedirectResult() {
    return this.authProvider.getRedirectResult();
  }

  onAuthChange(onUserChange) {
    this.authProvider.onAuthStateChanged(onUserChange);
  }
}
