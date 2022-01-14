import { WineBar } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeGoerDialog from "../WelcomeGoerDialog/WelcomeGoerDialog";
import WelcomeOwnerDialog from "../WelcomeOwnerDialog/WelcomeOwnerDialog";

export default function WelcomePageView({ menuRepository }) {
  const [ownerOpen, setOwnerOpen] = useState(false);
  const [goerOpen, setGoerOpen] = useState(false);

  const navigate = useNavigate();
  function handleLogoOnClick() {
    navigate("/");
  }
  function handleOwnerClick() {
    setOwnerOpen(true);
  }
  function handleGoerClick() {
    setGoerOpen(true);
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
          justifyContent: "start",
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
      </Box>
      <Box
        sx={{
          width: "90vw",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                size="large"
                onClick={handleOwnerClick}
              >
                Restaurant
                <br />
                Owner?
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" size="large" onClick={handleGoerClick}>
                Restaurant
                <br />
                Go-er?
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <WelcomeOwnerDialog
        open={ownerOpen}
        setOpen={setOwnerOpen}
        menuRepository={menuRepository}
      />
      <WelcomeGoerDialog
        open={goerOpen}
        setOpen={setGoerOpen}
        menuRepository={menuRepository}
      />
    </Box>
  );
}
