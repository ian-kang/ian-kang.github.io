import { Box } from "@mui/material";
import React from "react";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
function BaseLayout({ customerId, menuRepository, authService, component }) {
  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <NavBar
          customerId={customerId}
          authService={authService}
          menuRepository={menuRepository}
        />
      </Box>
      <Box>{component}</Box>
      <Box sx={{ mb: 8 }}>
        <Footer />
      </Box>
    </Box>
  );
}
export default BaseLayout;
