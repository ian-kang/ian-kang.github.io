import { Tab, Tabs } from "@mui/material";
import React from "react";

export default function NavBarTabs({ value, handleChange, orientation }) {
  return (
    <Tabs value={value} onChange={handleChange} orientation={orientation}>
      <Tab label="Menu Editor" href="/#/editor" value="design" />
      <Tab label="Your Menu" href="/#/menu" value="menu" />
    </Tabs>
  );
}
