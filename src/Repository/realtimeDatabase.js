// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  update,
  get,
  child,
  remove,
} from "firebase/database";
import * as firebaseui from "firebaseui";
import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";

// Set the configuration for your app
// TODO: Replace with your project's config object
export default class FirebaseDatabase {
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      authDomain: "localhost",
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    };
    const app = initializeApp(firebaseConfig);
    this.database = getDatabase(app);
    this.auth = getAuth();
    this.ui = new firebaseui.auth.AuthUI(this.auth);
  }
  addMenu(customerId, menu, menuId) {
    set(ref(this.database, customerId + "/menus/" + menuId), menu);
  }
  updateMenu(customerId, menuId, updatedMenu) {
    update(ref(this.database, customerId + "/menus/" + menuId), updatedMenu);
  }
  deleteMenu(customerId, menuId) {
    remove(ref(this.database, customerId + "/menus/" + menuId));
  }
  getMenus(customerId, callbackfn) {
    const dbRef = ref(this.database);
    get(child(dbRef, customerId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          callbackfn(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  updateCategory(customerId, menusWithNewCategory) {
    update(ref(this.database, customerId + "/menus/"), menusWithNewCategory);
  }
  authtest() {
    this.ui.start("#firebaseui-auth-container", {
      // Other config options...
      callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return true;
        },
        uiShown: function () {
          // The widget is rendered.
          // Hide the loader.
          document.getElementById("loader").style.display = "none";
        },
      },
      signInFlow: "popup",
      signInSuccessUrl: "/menu",
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          signInMethod: EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        },
        GoogleAuthProvider.PROVIDER_ID,
      ],
      // Terms of service url.
      tosUrl: "<your-tos-url>",
      // Privacy policy url.
      privacyPolicyUrl: "<your-privacy-policy-url>",
    });
    return this.auth;
  }
}
