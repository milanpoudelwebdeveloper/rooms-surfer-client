import { Lock, Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../axiosInstance";
import Login from "../components/Login/Login";

import UserIcons from "../components/User/UserIcons";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const { user, loginUser, isLoggedIn } = useContext(AuthContext);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const closeLogin = () => {
    setOpenLogin(false);
  };

  useEffect(() => {
    if (isLoggedIn) return;
    axiosInstance
      .get("/users")
      .then((res) => {
        loginUser(res?.data?.user);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [isLoggedIn]);

  return (
    <>
      <AppBar>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Box sx={{ mr: 1 }}>
              <IconButton size="large" color="inherit">
                <Menu />
              </IconButton>
            </Box>
            <Typography variant="h6" component="h1" noWrap sx={{ flexGrow: 1 }}>
              {isMobile ? "Welcome!" : "You are welcome!"}
            </Typography>
            {!user ? (
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => setOpenLogin(true)}
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
          <Login open={openLogin} handleClose={closeLogin} />
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Home;
