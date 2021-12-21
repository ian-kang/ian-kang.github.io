import { Avatar, Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";

function NavBar({ logo, name }) {
  const [navValue, setNavValue] = useState();
  const handleNavOnChange = (event, newValue) => {
    setNavValue(newValue);
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "80px",
          m: "16px",
        }}
      >
        <Box>
          <Tabs
            value={navValue}
            onChange={handleNavOnChange}
            aria-label="nav tabs example"
          >
            <Tab label="Home" href="/" value="home" />
            <Tab label="About" href="/about" value="about" />
            <Tab label="Dashboard" href="/dashboard" value="dashboard" />
            <Tab label="Menu Editor" href="/design" value="design" />
            <Tab label="Your Menu" href="/menu" value="menu" />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              art="logo"
              src={logo}
              sx={{ width: 80, height: 80 }}
              variant="rounded"
            />
            <Typography sx={{ mt: 2, mb: 2 }} variant="h6" component="div">
              {name}
            </Typography>
          </Stack>
        </Box>
      </Box>

      <hr />
    </div>
  );
}

export default NavBar;
