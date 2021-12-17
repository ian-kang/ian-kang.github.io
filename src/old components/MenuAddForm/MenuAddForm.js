import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuInputAddForm from "../MenuInputAddForm/MenuInputAddForm";
import MenuInputForm from "../MenuInputForm/MenuInputForm";

export default function MenuEditForm({ newPairedId, addNewPairedMenu }) {
  const [newPairedMenu, setNewPairedMenu] = useState({
    [newPairedId]: { foods: {}, drinks: {} },
  });
  console.log(newPairedMenu);
  console.log(newPairedId);

  const handleAddButton = () => {
    addNewPairedMenu(newPairedMenu);
    setNewPairedMenu({
      [newPairedId + 1]: { foods: {}, drinks: {} },
    });
  };

  const addFood = (pairedId, food) => {
    const updated = { ...newPairedMenu };
    const newFoodId = Date.now();
    updated[pairedId].foods[newFoodId] = food;
    setNewPairedMenu(updated);
  };
  const addDrink = (pairedId, drink) => {
    const updated = { ...newPairedMenu };
    const newDrinkId = Date.now();
    updated[pairedId].drinks[newDrinkId] = drink;
    setNewPairedMenu(updated);
  };
  const updateFoodMenu = (pairedId, foodId, food) => {
    const updated = { ...newPairedMenu };
    updated[pairedId].foods[foodId] = food;
    setNewPairedMenu(updated);
  };
  const updateDrinkMenu = (pairedId, drinkId, drink) => {
    const updated = { ...newPairedMenu };
    updated[pairedId].drinks[drinkId] = drink;
    setNewPairedMenu(updated);
  };
  console.log(newPairedMenu);
  return (
    <Box sx={{ border: "1px solid", borderRadius: "8px", mb: "8px" }}>
      <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
        New Paired Menu
        <Button
          variant="contained"
          sx={{ ml: "8px" }}
          onClick={handleAddButton}
        >
          Add
        </Button>
      </Typography>
      <Grid container item spacing={2} sx={{ mt: "8px" }}>
        <Grid container item xs={6} spacing={4} alignItems="flex-start">
          {newPairedMenu[newPairedId].foods &&
            Object.keys(newPairedMenu[newPairedId].foods).map((foodId) => (
              <MenuInputForm
                pairedId={newPairedId}
                menuId={foodId}
                menu={newPairedMenu[newPairedId].foods[foodId]}
                updateMenu={updateFoodMenu}
              />
            ))}
          <MenuInputAddForm pairedId={newPairedId} addMenu={addFood} />
        </Grid>
        <Grid container item xs={6} spacing={4}>
          {newPairedMenu[newPairedId].drinks &&
            Object.keys(newPairedMenu[newPairedId].drinks).map((drinkId) => (
              <MenuInputForm
                pairedId={newPairedId}
                menuId={drinkId}
                menu={newPairedMenu[newPairedId].drinks[drinkId]}
                updateMenu={updateDrinkMenu}
              />
            ))}
          <MenuInputAddForm pairedId={newPairedId} addMenu={addDrink} />
        </Grid>
      </Grid>
    </Box>
  );
}
