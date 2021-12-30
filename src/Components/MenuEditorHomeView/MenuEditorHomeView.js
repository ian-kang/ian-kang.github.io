import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";
import CategoryAddForm from "../CategoryAddForm/CategoryAddForm";
import MenuEditorListView from "../MenuEditorListView/MenuEditorListView";

export default function MenuEditorHomeView({
  customerId,
  menuRepository,
  imageRepository,
}) {
  const [database, setDatabase] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    menuRepository.getMenus(customerId, (data) => {
      if (data) {
        setDatabase(data);
        setLoading(false);
        return;
      }
      setLoading(false);
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
      if (data) {
        setDatabase(data);
        return;
      }
      setDatabase({});
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
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            width: "100vw",
            height: "500px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <CircleLoader
              loading={loading}
              css={{ display: "block" }}
              size={100}
            />
          </Box>
          <Box>
            <Typography variant="h5">Loading Editor...</Typography>
          </Box>
        </Box>
      ) : (
        <Grid container>
          <Grid container item justifyContent="center">
            <Grid item>
              <Typography variant="h5">Menu Editor</Typography>
            </Grid>
          </Grid>
          <Grid container item justifyContent="center">
            <Grid container item xs={10} spacing={4}>
              {Object.keys(database).find((key) => key === "menus") ? (
                <Grid container item xs={12}>
                  <MenuEditorListView
                    data={database}
                    imageRepository={imageRepository}
                    customerId={customerId}
                    updateMenu={updateMenu}
                    deleteMenu={deleteMenu}
                    addMenu={addMenu}
                    editCategory={editCategory}
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
