import { Edit, Save } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Box,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import CategoryForm from "../CategoryForm/CategoryForm";
import MenuCard from "../MenuCard/MenuCard";
import MenuInputAddForm from "../MenuInputAddForm/MenuInputAddForm";
import MenuInputEditForm from "../MenuInputEditForm/MenuInputEditForm";

function MenuEditorListView({
  menus,
  categories,
  customerId,
  updateMenu,
  deleteMenu,
  addMenu,
  editCategory,
}) {
  return (
    <>
      {categories.map((category) => (
        <Box>
          <Box sx={{ mt: 4 }}>
            <Divider />
          </Box>
          <Box>
            <Grid container spacing={4} sx={{ mt: 1 }}>
              <CategoryForm
                customerId={customerId}
                category={category}
                editCategory={editCategory}
              />
              <Grid
                item
                container
                xs={6}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Typography variant="h5">{category}</Typography>
                </Grid>
              </Grid>
              {menus
                .filter((menu) => menu.category === category)
                .map((menu) => (
                  <Grid container item xs={12} alignItems="center" spacing={4}>
                    <Grid item xs={6}>
                      <MenuInputEditForm
                        customerId={customerId}
                        menu={menu}
                        updateMenu={updateMenu}
                        deleteMenu={deleteMenu}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <MenuCard menu={menu} />
                    </Grid>
                  </Grid>
                ))}
              <Grid item xs={6}>
                <MenuInputAddForm
                  buttonName="Add"
                  customerId={customerId}
                  category={category}
                  addMenu={addMenu}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default MenuEditorListView;
