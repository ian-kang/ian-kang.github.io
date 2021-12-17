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

      {Object.keys(data.menus).map((category) => (
        <Grid container item justifyContent="center">
          <Grid container item xs={10} spacing={4}>
            <Grid container item xs={12}>
              <MenuEditorListView
                menus={data.menus[category]}
                updateMenu={updateMenu}
                deleteMenu={deleteMenu}
                addMenu={addMenu}
                customerId={customerId}
                category={category}
              />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

export default MenuEditorHomeView;
