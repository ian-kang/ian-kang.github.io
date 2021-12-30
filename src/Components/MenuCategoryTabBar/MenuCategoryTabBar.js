import { Tab, Tabs } from "@mui/material";
import React from "react";

function MenuCategoryTabBar({ category, categories, handleTabChange }) {
  return (
    <Tabs
      value={category}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons="auto"
    >
      {categories.map((category) => (
        <Tab key={category} label={category} value={category} />
      ))}
    </Tabs>
  );
}

export default MenuCategoryTabBar;
