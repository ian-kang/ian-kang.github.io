import { Add, Edit, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuCategoryTabBar from "../MenuCategoryTabBar/MenuCategoryTabBar";
import MenuEditorListView from "../MenuEditorListView/MenuEditorListView";
import MenuEditorPreview from "../MenuEditorPreview/MenuEditorPreview";

function MenuEditorHomeView({
  data,
  customerId,
  updateMenu,
  deleteMenu,
  addMenu,
  addCategory,
  editCategory,
}) {
  const [value, setValue] = useState();
  const [disabled, setDisabled] = useState(true);
  const [categoryOnChange, SetCategoryOnChange] = useState(data.menus);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleInputOnChange = (event) => {
    const targetInput = event.target.name;
    const value = event.target.value;
    const updated = { ...categoryOnChange, [targetInput]: value };
    SetCategoryOnChange(updated);
  };
  const handleEditCategoryButton = () => {
    setDisabled(false);
  };
  const handleSaveCategoryButton = () => {
    setDisabled(true);
  };

  return (
    <Grid container>
      <Grid container item justifyContent="center">
        <Grid item>
          <Typography variant="h5">Menu Editor</Typography>
        </Grid>
      </Grid>

      {Object.keys(categoryOnChange).map((category) => (
        <TextField
          disabled={disabled}
          required
          name={category}
          value={category}
          onChange={handleInputOnChange}
        />
      ))}
      <Grid item>
        <Button
          variant="outlined"
          startIcon={<Edit />}
          onClick={handleEditCategoryButton}
        >
          Category
        </Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" startIcon={<Add />} onClick={addCategory}>
          Category
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          startIcon={<Save />}
          onClick={handleSaveCategoryButton}
        >
          Category
        </Button>
      </Grid>

      <Grid
        container
        alignItems="center"
        spacing={2}
        sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}
      >
        <Grid item>
          <MenuCategoryTabBar
            data={data}
            category={value}
            handleTabChange={handleTabChange}
          />
        </Grid>
      </Grid>
      {value && (
        <Grid container item justifyContent="center">
          <Grid container item xs={10} spacing={4}>
            <Grid item xs={6}>
              <MenuEditorListView
                menus={data.menus[value]}
                updateMenu={updateMenu}
                deleteMenu={deleteMenu}
                addMenu={addMenu}
                customerId={customerId}
                category={value}
              />
            </Grid>
            <Grid item xs={6}>
              <MenuEditorPreview menus={data.menus[value]} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default MenuEditorHomeView;
