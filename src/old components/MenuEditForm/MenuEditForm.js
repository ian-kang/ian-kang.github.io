import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import MenuInputAddForm from "../MenuInputAddForm/MenuInputAddForm";
import MenuInputForm from "../MenuInputForm/MenuInputForm";

export default function MenuEditForm({
  pairedId,
  pairedMenu,
  updateFoodMenu,
  updateDrinkMenu,
  addFood,
  addDrink,
  deleteFoodMenu,
  deleteDrinkMenu,
}) {
  const handleDeleteButton = () => {};
  return (
    <Box sx={{ border: "1px solid", borderRadius: "8px", mb: "8px" }}>
      <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
        Paired Menu {pairedId}
        <Button
          variant="contained"
          sx={{ ml: "8px" }}
          onClick={handleDeleteButton}
        >
          Delete
        </Button>
      </Typography>
      <Grid container item spacing={2} sx={{ mt: "8px" }}>
        <Grid container item xs={6} spacing={4} alignItems="flex-start">
          {Object.keys(pairedMenu.foods).map((foodId) => (
            <MenuInputForm
              pairedId={pairedId}
              menuId={foodId}
              menu={pairedMenu.foods[foodId]}
              updateMenu={updateFoodMenu}
              deleteMenu={deleteFoodMenu}
            />
          ))}
          <MenuInputAddForm pairedId={pairedId} addMenu={addFood} />
        </Grid>
        <Grid container item xs={6} spacing={4}>
          {Object.keys(pairedMenu.drinks).map((drinkId) => (
            <MenuInputForm
              pairedId={pairedId}
              menuId={drinkId}
              menu={pairedMenu.drinks[drinkId]}
              updateMenu={updateDrinkMenu}
              deleteMenu={deleteDrinkMenu}
            />
          ))}
          <MenuInputAddForm pairedId={pairedId} addMenu={addDrink} />
        </Grid>
      </Grid>
    </Box>
  );
}
