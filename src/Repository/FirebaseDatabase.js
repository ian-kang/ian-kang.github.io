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
    update(
      ref(this.database, customerId + "/menus/items/" + menuId),
      updatedMenu
    );
  }
  deleteMenu(customerId, menuId) {
    remove(ref(this.database, customerId + "/menus/" + menuId));
  }
  updateMenus(customerId, updatedMenus) {
    update(ref(this.database, customerId + "/menus/"), updatedMenus);
  }
  updateLayout(customerId, updatedLayout) {
    update(ref(this.database, customerId), updatedLayout);
  }
  getCustomerInfo(customerId, callbackfn) {
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
  addCustomerInfo(customerId, customerInfo) {
    set(ref(this.database, customerId), customerInfo);
  }
  updateCustomerInfo(customerId, updatedInfo) {
    update(ref(this.database, customerId), updatedInfo);
  }
  submitOwnerForm(submitId, ownerInfo) {
    set(ref(this.database, "submitForm/owner/" + submitId), ownerInfo);
  }
  submitGoerForm(submitId, goerInfo) {
    set(ref(this.database, "submitForm/goer/" + submitId), goerInfo);
  }
}
