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

// Set the configuration for your app
// TODO: Replace with your project's config object
export default class FirebaseDatabase {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCt2mIHFWq3tlxp2gWtiVt6x9GIpLPtZnw",
      authDomain: "menu-creator-35f21.firebaseapp.com",
      projectId: "menu-creator-35f21",
      storageBucket: "menu-creator-35f21.appspot.com",
      messagingSenderId: "312681521941",
      appId: "1:312681521941:web:71aefc928cdc87ba237f1c",
      measurementId: "G-H1M17478JG",
    };
    const app = initializeApp(firebaseConfig);
    this.database = getDatabase(app);
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
    update(ref(this.database, customerId + "/menus"), menusWithNewCategory);
  }
}
