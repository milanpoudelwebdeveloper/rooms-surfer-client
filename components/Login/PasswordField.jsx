import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";

const PasswordField = ({
  passwordRef,
  label = "Password",
  id = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <TextField
      inputRef={passwordRef}
      required
      id={id}
      label={label}
      type={showPassword ? "text" : "password"}
      margin="normal"
      variant="standard"
      fullWidth
      inputProps={{ "aria-label": "password", minLength: 4 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    >
      PasswordField
    </TextField>
  );
};

export default PasswordField;
