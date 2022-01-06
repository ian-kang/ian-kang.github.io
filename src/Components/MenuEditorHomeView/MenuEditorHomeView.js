import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryAddForm from "../CategoryAddForm/CategoryAddForm";
import LoadingView from "../LoadingView/LoadingView";
import MenuEditorListView from "../MenuEditorListView/MenuEditorListView";

export default function MenuEditorHomeView({
  customerId,
  menuRepository,
  imageRepository,
}) {
  const [database, setDatabase] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setDatabase(data);
        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }, [customerId, menuRepository]);

  function saved() {
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setDatabase(data);
        setLoading(false);
        return;
      }
      setLoading(false);
    });
  }

  function difference(oldArray, newArray) {
    return oldArray.filter((x) => !newArray.includes(x));
  }

  const updateMenu = (customerId, oldMenu, updatedMenu) => {
    if (!oldMenu.pairs && !updatedMenu.pairs) {
      menuRepository.updateMenu(customerId, oldMenu.menuId, updatedMenu);
      menuRepository.getCustomerInfo(customerId, (data) => {
        setDatabase(data);
      });
    } else {
      menuRepository.updateMenu(customerId, oldMenu.menuId, updatedMenu);
      let addedPairs;
      let removedPairs;
      if (!oldMenu.pairs) {
        addedPairs = updatedMenu.pairs;
      } else if (!updatedMenu.pairs) {
        removedPairs = oldMenu.pairs;
      } else {
        removedPairs = difference(oldMenu.pairs, updatedMenu.pairs);
        addedPairs = difference(updatedMenu.pairs, oldMenu.pairs);
      }
      menuRepository.getCustomerInfo(customerId, (data) => {
        if (addedPairs && addedPairs.length > 0) {
          addedPairs.forEach((id) => {
            const pairs = data.menus[id].pairs;
            if (pairs) {
              pairs.push(updatedMenu.menuId);
            } else {
              data.menus[id]["pairs"] = [updatedMenu.menuId];
            }
          });
        }
        if (removedPairs && removedPairs.length > 0) {
          removedPairs.forEach((id) => {
            const pairs = data.menus[id].pairs;
            if (pairs) {
              const index = pairs.indexOf(updatedMenu.menuId);
              if (index > -1) {
                data.menus[id].pairs.splice(index, 1);
              }
            }
          });
        }
        menuRepository.updateMenus(customerId, data.menus);
        setDatabase(data);
      });
    }
  };
  const deleteMenu = (customerId, menus, menuId) => {
    // Delete this menu from the pairs of all the menus
    const updatedMenus = { ...menus };
    delete updatedMenus[menuId];
    const menuIds = Object.keys(updatedMenus);

    menuIds.forEach((id) => {
      const pairs = updatedMenus[id].pairs;
      if (pairs) {
        const index = pairs.indexOf(menuId);
        if (index > -1) {
          updatedMenus[id].pairs.splice(index, 1);
        }
        return;
      }
    });
    menuRepository.deleteMenu(customerId, menuId);
    menuRepository.updateMenus(customerId, updatedMenus);
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setDatabase(data);
        return;
      }
      setDatabase({});
    });
  };
  const addCategory = (customerId, category) => {
    const newId = Date.now();
    menuRepository.addMenu(
      customerId,
      {
        menuId: newId,
        category,
        name: "New menu",
        rate: "none",
        price: "",
        desc: "New menu description",
        img: "",
        pairs: [],
      },
      newId
    );
    menuRepository.getCustomerInfo(customerId, (data) => {
      setDatabase(data);
    });
  };
  const editCategory = (customerId, oldCategory, newCategory) => {
    const copied = { ...database.menus };
    Object.keys(copied).forEach((key) => {
      if (copied[key].category === oldCategory) {
        copied[key].category = newCategory;
        return;
      }
    });
    menuRepository.updateCategory(customerId, copied);

    menuRepository.getCustomerInfo(customerId, (data) => {
      setDatabase(data);
    });
  };
  return (
    <>
      {loading ? (
        <LoadingView loading={loading} text="Loading Editor..." />
      ) : (
        <Grid container>
          <Grid container item justifyContent="center">
            <Grid item>
              <Typography variant="h5">Menu Editor</Typography>
            </Grid>
          </Grid>
          <Grid container item justifyContent="center">
            <Grid
              container
              item
              xs={10}
              spacing={8}
              sx={{ maxWidth: "1500px" }}
            >
              {Object.keys(database).find((key) => key === "menus") ? (
                <Grid container item>
                  <MenuEditorListView
                    data={database}
                    imageRepository={imageRepository}
                    menuRepository={menuRepository}
                    customerId={customerId}
                    updateMenu={updateMenu}
                    deleteMenu={deleteMenu}
                    addMenu={addMenu}
                    editCategory={editCategory}
                    saved={saved}
                  />
                </Grid>
              ) : null}

              <Grid container item xs={12}>
                <CategoryAddForm
                  customerId={customerId}
                  addCategory={addCategory}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
