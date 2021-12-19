import { Edit, Save } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuCard from "../MenuCard/MenuCard";
import MenuInputAddForm from "../MenuInputAddForm/MenuInputAddForm";
import MenuInputEditForm from "../MenuInputEditForm/MenuInputEditForm";

function MenuEditorListView({ menus, categories, customerId, updateMenu }) {
  const [disabled, setDisabled] = useState(true);

  const handleEditButtonOnClick = () => {
    setDisabled(false);
  };
  const handleSaveButtonOnClick = () => {
    setDisabled(true);
  };
  const handleInputOnChange = (event) => {
    const value = event.target.value;
  };
  return (
    <>
      {categories.map((category) => (
        <Box>
          <Box sx={{ mt: 4 }}>
            <Divider />
          </Box>
          <Box>
            <Grid container spacing={4} sx={{ mt: 1 }}>
              <Grid container item xs={6} spacing={2} alignItems="center">
                <Grid item xs={9}>
                  <TextField
                    disabled={disabled}
                    required
                    label="Category"
                    name="category"
                    value={category}
                    onChange={handleInputOnChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  {disabled ? (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Edit />}
                      onClick={handleEditButtonOnClick}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<Save />}
                      onClick={handleSaveButtonOnClick}
                    >
                      Save
                    </Button>
                  )}
                </Grid>
              </Grid>
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
                        // deleteMenu={deleteMenu}
                        category={category}
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
                  // addMenu={addMenu}
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
