import { Divider, Grid } from "@mui/material";
import React from "react";

export default function FoodCenterMenu({ foodMenuItem, drinkMenuItems }) {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{ border: "1px solid", borderRadius: "8px", mb: "8px" }}
    >
      <Grid item xs={6}>
        {foodMenuItem}
      </Grid>
      <Grid item xs={6}>
        {drinkMenuItems}
      </Grid>
      <Divider />
    </Grid>
  );
}
