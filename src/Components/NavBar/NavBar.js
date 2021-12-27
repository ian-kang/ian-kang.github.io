import { Menu } from "@mui/icons-material";
import {
  Box,
  Button,
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
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import NavBarTabs from "../NavBarTabs/NavBarTabs";
import NavBarToggleList from "../NavbarToggleList/NavBarToggleList";

function NavBar() {
  const [navValue, setNavValue] = useState();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const { user } = useContext(UserContext);
  const logo =
    "https://res.cloudinary.com/db7ss52zt/image/upload/v1639668058/Menu%20Creator/Logo/Pour_Haus_Wine_Bar_Logo_uhxovp.jpg";

  const handleNavOnChange = (event, newValue) => {
    setNavValue(newValue);
  };
  const toggleDrawer = (status) => (event) => {
    setOpen(status);
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
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h5">Pairable</Typography>
        </Box>
        {matches && (
          <Box>
            <NavBarTabs value={navValue} handleChange={handleNavOnChange} />
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
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button>Sign in</Button>
            </Link>
            <Stack direction="row" spacing={2} alignItems="center">
              <Paper variant="outlined">
                <img
                  src={logo} //TODO: insert business logo img source after login
                  alt=""
                  loading="lazy"
                  style={{ width: "50px", height: "50px" }}
                />
              </Paper>
              <Typography sx={{ mt: 2, mb: 2 }} variant="h7" component="div">
                {user.displayName}
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
              {open && <NavBarToggleList logo={logo} name={user.displayName} />}
            </SwipeableDrawer>
          </Box>
        )}
      </Box>

      <hr />
    </div>
  );
}

export default NavBar;
