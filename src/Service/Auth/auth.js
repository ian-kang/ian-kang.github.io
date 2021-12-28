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
