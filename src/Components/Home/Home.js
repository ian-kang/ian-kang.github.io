import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Home({ navBar, authService, user }) {
  return <Box>{navBar}</Box>;
}
export default Home;
