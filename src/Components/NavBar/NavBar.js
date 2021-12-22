import { Menu } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  SwipeableDrawer,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import NavBarToggleList from "../NavbarToggleList/NavBarToggleList";

function NavBar({ logo, name }) {
  const [navValue, setNavValue] = useState();
  const [open, setOpen] = useState(false);
  const handleNavOnChange = (event, newValue) => {
    setNavValue(newValue);
  };
  const toggleDrawer = (status) => (event) => {
    setOpen(status);
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
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
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h5">Pairable</Typography>
        </Box>
        {matches && (
          <Box>
            <Tabs
              value={navValue}
              onChange={handleNavOnChange}
              aria-label="nav tabs example"
            >
              <Tab label="Menu Editor" href="/#/editor" value="design" />
              <Tab label="Your Menu" href="/#/menu" value="menu" />
            </Tabs>
          </Box>
        )}
        {matches ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Paper variant="outlined">
                <img
                  src={logo}
                  alt="No Iamge"
                  loading="lazy"
                  style={{ width: "50px", height: "50px" }}
                />
              </Paper>
              <Typography sx={{ mt: 2, mb: 2 }} variant="h7" component="div">
                {name}
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <Menu />
            </IconButton>
            <SwipeableDrawer
              anchor="right"
              open={open}
              onClose={toggleDrawer(false)}
            >
              {open && <NavBarToggleList logo={logo} name={name} />}
            </SwipeableDrawer>
          </Box>
        )}
      </Box>

      <hr />
    </div>
  );
}

export default NavBar;
