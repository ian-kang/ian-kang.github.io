import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { CircleLoader } from "react-spinners";

export default function LoadingView({ loading, text }) {
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
