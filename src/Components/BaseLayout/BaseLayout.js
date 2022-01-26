import { Box, Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
function BaseLayout({ customerId, menuRepository, authService, component }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
        navigate("/login");
      }
    });
  });

  return (
    <>
      {user && (
        <Container maxWidth="xl">
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
        </Container>
      )}
    </>
  );
}
export default BaseLayout;
