import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CategoryAddForm from "../CategoryAddForm/CategoryAddForm";
import MenuEditorListView from "../MenuEditorListView/MenuEditorListView";

export default function MenuEditorHomeView({ menuRepository, cloudinary }) {
  const customerId = "restaurant1";
  const [database, setDatabase] = useState({});

  useEffect(() => {
    menuRepository.getMenus(customerId, (data) => {
      setDatabase(data);
    });
  }, []);

  const updateMenu = (customerId, menuId, updatedMenu) => {
    menuRepository.updateMenu(customerId, menuId, updatedMenu);
    menuRepository.getMenus(customerId, (data) => {
      setDatabase(data);
    });
  };
  const deleteMenu = (customerId, menuId) => {
    menuRepository.deleteMenu(customerId, menuId);
    menuRepository.getMenus(customerId, (data) => {
      setDatabase(data);
    });
  };
  const addMenu = (customerId, newMenu, newMenuId) => {
    menuRepository.addMenu(customerId, newMenu, newMenuId);
    menuRepository.getMenus(customerId, (data) => {
      setDatabase(data);
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
    menuRepository.getMenus(customerId, (data) => {
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

    menuRepository.getMenus(customerId, (data) => {
      setDatabase(data);
    });
  };
  return (
    <Grid container>
      <Grid container item justifyContent="center">
        <Grid item>
          <Typography variant="h5">Menu Editor</Typography>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        <Grid container item xs={10} spacing={4}>
          {Object.keys(database).find((key) => key === "menus") && (
            <Grid container item xs={12}>
              <MenuEditorListView
                data={database}
                cloudinary={cloudinary}
                customerId={customerId}
                updateMenu={updateMenu}
                deleteMenu={deleteMenu}
                addMenu={addMenu}
                editCategory={editCategory}
              />
            </Grid>
          )}

          <Grid container item xs={12}>
            <CategoryAddForm
              customerId={customerId}
              addCategory={addCategory}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
