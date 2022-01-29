// Import the functions you need from the SDKs you need
import {
  getDatabase,
  ref,
  set,
  update,
  get,
  child,
  remove,
} from "firebase/database";

export default class FirebaseDatabase {
  constructor(app) {
    this.database = getDatabase(app);
  }
  addMenu(customerId, menu, menuId) {
    set(ref(this.database, "clients/" + customerId + "/menus/" + menuId), menu);
  }
  updateMenu(customerId, menuId, updatedMenu) {
    update(
      ref(this.database, "clients/" + customerId + "/menus/items/" + menuId),
      updatedMenu
    );
  }
  getMenu(customerId, menuId, callbackfn) {
    const dbRef = ref(this.database);
    get(child(dbRef, `clients/${customerId}/menus/items/${menuId}`))
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
  deleteMenu(customerId, menuId) {
    remove(ref(this.database, "clients/" + customerId + "/menus/" + menuId));
  }
  updateMenus(customerId, updatedMenus) {
    update(
      ref(this.database, "clients/" + customerId + "/menus/"),
      updatedMenus
    );
  }
  updateCategory(customerId, menusWithNewCategory) {
    update(
      ref(this.database, "clients/" + customerId + "/menus/"),
      menusWithNewCategory
    );
  }
  getClients(callbackFn) {
    const dbRef = ref(this.database);
    get(child(dbRef, "clients/")).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        callbackFn(data);
      } else {
        callbackFn(null);
      }
    });
  }

  getCustomerInfo(customerId, callbackfn) {
    const dbRef = ref(this.database);
    get(child(dbRef, `clients/${customerId}`))
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
  addCustomerInfo(customerId, customerInfo) {
    set(ref(this.database, "clients/" + customerId), customerInfo);
  }
  updateCustomerInfo(customerId, customerInfo) {
    update(ref(this.database, "clients/" + customerId), customerInfo);
  }
  submitOwnerForm(submitId, ownerInfo) {
    set(ref(this.database, "submitForm/owner/" + submitId), ownerInfo);
  }
  submitGoerForm(submitId, goerInfo) {
    set(ref(this.database, "submitForm/goer/" + submitId), goerInfo);
  }
  // updateDatabase(updatedInfo) {
  //   update(ref(this.database), updatedInfo);
  // }
}
