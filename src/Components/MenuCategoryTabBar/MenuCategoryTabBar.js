import { Tab, Tabs } from "@mui/material";
import React from "react";

function MenuCategoryTabBar({ category, categories, handleTabChange }) {
  return (
    <Tabs
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        backgroundColor: "white",
      }}
      value={category}
      onChange={handleTabChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
    >
      {categories.map((category) => (
        <Tab key={category} label={category} value={category} />
      ))}
    </Tabs>
  );
}

export default MenuCategoryTabBar;
