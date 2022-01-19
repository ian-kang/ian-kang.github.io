import { Login, WineBar } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFoundView() {
  const navigate = useNavigate();
  function handleLogoOnClick() {
    navigate("/");
  }
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ m: 2, ml: 3 }}>
          <Button
            sx={{ color: "black" }}
            startIcon={<WineBar />}
            onClick={handleLogoOnClick}
          >
            <Typography>Pairable</Typography>
          </Button>
        </Box>
        <Box sx={{ m: 2, mr: 3 }}>
          <Button
            sx={{ color: "black" }}
            startIcon={<Login />}
            onClick={() => {
              navigate("/login");
            }}
          >
            <Typography>Login</Typography>
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100vw",
          height: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5">Error 404</Typography>
          <Typography variant="h4">Page Not Found</Typography>
        </Box>
      </Box>
    </Box>
  );
}
