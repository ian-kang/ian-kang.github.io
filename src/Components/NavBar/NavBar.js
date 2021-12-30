import { AssignmentInd, Edit, Logout, WineBar } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import LinkButton from "../LinkButton/LinkButton";

function NavBar({ authService }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
  };
  const handleProfileClick = (event) => {
    navigate("/profile");
    setAnchorElUser(null);
  };
  const handleMenuEditorClick = (event) => {
    navigate("/editor");
    setAnchorElUser(null);
  };
  const handleYourMenuClick = (event) => {
    navigate("/menu");
    setAnchorElUser(null);
  };
  const handleSignOut = () => {
    authService
      .logout()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
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
        {user && user ? (
          <Box>
            <Tooltip title="Open Setting">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  variant="rounded"
                  src="https://res.cloudinary.com/db7ss52zt/image/upload/v1639668058/Menu%20Creator/Logo/Pour_Haus_Wine_Bar_Logo_uhxovp.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleProfileClick}>
                <IconButton>
                  <AssignmentInd />
                </IconButton>
                <Typography>Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleMenuEditorClick}>
                <IconButton>
                  <Edit />
                </IconButton>
                <Typography>Menu Editor</Typography>
              </MenuItem>
              <MenuItem onClick={handleYourMenuClick}>
                <IconButton>
                  <WineBar />
                </IconButton>
                <Typography>Your Menu</Typography>
              </MenuItem>
              <MenuItem onClick={handleSignOut}>
                <IconButton>
                  <Logout />
                </IconButton>
                <Typography>Sign Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box>
            <LinkButton path="/login" text="Sign In" />
          </Box>
        )}
      </Box>

      <hr />
    </div>
  );
}

export default NavBar;
