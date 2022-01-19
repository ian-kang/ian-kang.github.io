import { AssignmentInd, Edit, Logout, WineBar } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import LinkButton from "../LinkButton/LinkButton";

function NavBar({ customerId, authService, menuRepository }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [database, setDatabase] = useState({});

  useEffect(() => {
    menuRepository.getCustomerInfo(customerId, (data) => {
      if (data) {
        setDatabase(data);
        return;
      }
    });
  }, [customerId, menuRepository]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogoOnClick = () => {
    navigate("/editor");
  };
  const handleProfileClick = () => {
    navigate("/profile");
    setAnchorElUser(null);
  };
  const handleMenuEditorClick = () => {
    navigate("/editor");
    setAnchorElUser(null);
  };

  const handleMenuPreviewClick = () => {
    navigate("/preview");
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
          height: "50px",
          m: 2,
          ml: 3,
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Button
            sx={{ color: "black" }}
            startIcon={<WineBar />}
            onClick={handleLogoOnClick}
          >
            <Typography>Pairable</Typography>
          </Button>
        </Box>
        {user && user ? (
          <Box>
            <Tooltip title="Open Setting">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar variant="rounded" src={database && database.logo} />
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
              <MenuItem onClick={handleMenuPreviewClick}>
                <IconButton>
                  <WineBar />
                </IconButton>
                <Typography>Menu Preview</Typography>
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
