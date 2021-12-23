import React from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Google } from "@mui/icons-material";
import initializeFirebaseApp from "../../Service/Firebase/firebase";
function Home({ navBar }) {
  const handleOnClick = () => {
    initializeFirebaseApp();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(result);
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <Box>
      {navBar}
      <Grid container justifyContent="center">
        <Grid item>
          <List>
            <ListItem>
              <ListItemButton onClick={handleOnClick}>
                <ListItemIcon>
                  <Google />
                </ListItemIcon>
                <ListItemText>Sign in with Google</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}
export default Home;
