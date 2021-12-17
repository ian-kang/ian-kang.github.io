import { Tab, Tabs } from "@mui/material";
import React from "react";

function MenuCategoryTabBar({ data, category, handleTabChange }) {
  return (
    <Tabs value={category} onChange={handleTabChange}>
      {Object.keys(data.menus).map((category) => (
        <Tab label={category} value={category} />
      ))}
    </Tabs>
  );
}

export default MenuCategoryTabBar;
