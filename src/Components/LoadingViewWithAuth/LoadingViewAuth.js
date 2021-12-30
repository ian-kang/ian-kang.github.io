import { Box, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CircleLoader } from "react-spinners";
import { UserContext } from "../../App";

export default function LoadingViewWithAuth({ loading, text, authService }) {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, [user, setUser, authService, navigate]);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "500px",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box>
        <CircleLoader loading={loading} css={{ display: "block" }} size={100} />
      </Box>
      <Box>
        <Typography variant="h5">{text}</Typography>
      </Box>
    </Box>
  );
}
