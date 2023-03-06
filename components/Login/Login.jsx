import { Close, Send } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useContext, useRef, useState } from "react";
import GoogleOneTap from "./GoogleOneTap";
import PasswordField from "./PasswordField";
import { toast } from "react-toastify";
import { axiosInstance } from "../../axiosInstance";
import { AuthContext } from "../../context/authContext";

const Login = ({ open, handleClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const { loginUser } = useContext(AuthContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const resetValues = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isRegister &&
      passwordRef.current.value !== confirmPasswordRef.current.value
    ) {
      toast.error("Passwords do not match");
      return;
    }
    isRegister ? registerUser() : loginHandler();
  };

  const registerUser = async () => {
    try {
      const res = await axiosInstance.post("/auth/signUp", {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      toast.success(res.data.message);
      resetValues();
    } catch (e) {
      toast.error(e.response.data.message ?? "Something went wrong");
    }
  };

  const loginHandler = async () => {
    try {
      const res = await axiosInstance.post("/auth/signIn", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      toast.success(res.data.message);
      loginUser(res.data.user);
      handleClose();
    } catch (e) {
      console.log("something went wrong", e);
      toast.error(e?.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {isRegister ? "Sign up" : "Sign in"}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
            <TextField
              autoFocus={isRegister}
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ "aria-label": "name", minLength: 3 }}
              required
            />
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField passwordRef={passwordRef} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions
        sx={{
          justifyContent: "left",
          p: "5px 24px",
        }}
      >
        {isRegister
          ? "Do you have an account? Sign in now"
          : "Don't have an account? Sign up now"}
        <Button onClick={() => setIsRegister((prev) => !prev)}>
          {isRegister ? "Sign in" : "Sign up"}
        </Button>
      </DialogActions>
      <DialogActions
        sx={{
          justifyContent: "center",
          py: "24px",
        }}
      >
        <GoogleOneTap />
      </DialogActions>
    </Dialog>
  );
};

export default Login;
