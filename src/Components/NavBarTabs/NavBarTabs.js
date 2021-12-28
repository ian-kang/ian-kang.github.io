import { Box, Tab, Tabs } from "@mui/material";
import React from "react";

export default function NavBarTabs({ value, handleChange, orientation }) {
  return (
    <Box>
      <Tabs value={value} onChange={handleChange} orientation={orientation}>
        <Tab label="Menu Editor" href="/#/editor" value="editor" />
        <Tab label="Your Menu" href="/#/menu" value="menu" />
      </Tabs>
    </Box>
  );
}
