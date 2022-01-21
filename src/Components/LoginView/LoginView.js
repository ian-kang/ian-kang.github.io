import { WineBar } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import ForgotPassword from "../ForgotPasswordView/ForgotPasswordView";
import SignInView from "../SignInView/SignInView";
import SignUpView from "../SignUpView/SignUpView";

function LoginView({ authService, menuRepository }) {
  const [forgotPassword, setForgotPassword] = useState();
  const [signUp, setSignUp] = useState();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    authService.onAuthChange((user) => {
      if (user) {
        navigate("/editor");
      } else {
        setUser(undefined);
      }
    });
  });
  function handleLogoOnClick() {
    navigate("/");
  }
  return (
    <Dialog open maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}
      >
        <Button
          sx={{ color: "black" }}
          startIcon={<WineBar />}
          onClick={handleLogoOnClick}
        >
          <Typography>Pairable</Typography>
        </Button>
      </DialogTitle>
      {forgotPassword ? (
        <ForgotPassword
          authService={authService}
          setForgotPassword={setForgotPassword}
        />
      ) : signUp ? (
        <SignUpView
          authService={authService}
          menuRepository={menuRepository}
          setSignUp={setSignUp}
        />
      ) : (
        <SignInView
          authService={authService}
          setForgotPassword={setForgotPassword}
          setSignUp={setSignUp}
        />
      )}
    </Dialog>
  );
}
export default LoginView;
