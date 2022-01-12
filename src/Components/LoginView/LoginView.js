import { WineBar } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React, { useState } from "react";
import ForgotPassword from "../ForgotPasswordView/ForgotPasswordView";
import SignInView from "../SignInView/SignInView";

function LoginView({ authService }) {
  const [forgotPassword, setForgotPassword] = useState();
  return (
    <Dialog open maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}
      >
        <Button sx={{ color: "black" }} startIcon={<WineBar />}>
          <Typography>Pairable</Typography>
        </Button>
      </DialogTitle>
      {forgotPassword ? (
        <ForgotPassword
          authService={authService}
          setForgotPassword={setForgotPassword}
        />
      ) : (
        <SignInView
          authService={authService}
          setForgotPassword={setForgotPassword}
        />
      )}
    </Dialog>
  );
}
export default LoginView;
