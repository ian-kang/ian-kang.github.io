import { Box } from "@mui/material";
import React from "react";
import NavBar from "../NavBar/NavBar";
function BaseLayout({ authService, component }) {
  return (
    <Box>
      <Box>
        <NavBar authService={authService} />
      </Box>
      <Box>{component}</Box>
    </Box>
  );
}
export default BaseLayout;
