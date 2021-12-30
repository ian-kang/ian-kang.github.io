// Import the functions you need from the SDKs you need
import {
  getDatabase,
  ref,
  set,
  update,
  get,
  child,
  remove,
  onValue,
} from "firebase/database";

export default class FirebaseDatabase {
  constructor(app) {
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
          callbackfn(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  updateCategory(customerId, menusWithNewCategory) {
    update(ref(this.database, customerId + "/menus/"), menusWithNewCategory);
  }
  getDatabase(callbackFn) {
    const dbRef = ref(this.database);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        callbackFn(data);
      } else {
        callbackFn(null);
      }
    });
  }
  onDatabaseChange(callbackFn) {
    const dbRef = ref(this.database);
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      callbackFn(data);
    });
  }
  updateCustomerInfo(customerId, updatedInfo) {
    update(ref(this.database, customerId), updatedInfo);
  }
}
