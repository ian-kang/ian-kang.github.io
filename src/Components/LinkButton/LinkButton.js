import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function LinkButton({ path, text, startIcon }) {
  return (
    <Button startIcon={startIcon}>
      <Link to={path} style={{ textDecoration: "none", color: "black" }}>
        {text}
      </Link>
    </Button>
  );
}
