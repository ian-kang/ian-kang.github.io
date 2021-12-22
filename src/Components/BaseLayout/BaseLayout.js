import { Box } from "@mui/material";
import React from "react";
import NavBar from "../NavBar/NavBar";
function BaseLayout({ component }) {
  return (
    <Box>
      <Box>
        <NavBar />
      </Box>
      <Box>{component}</Box>
    </Box>
  );
}
export default BaseLayout;
