import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { Check } from "@mui/icons-material";

const InfoField = ({
  mainProps,
  optionalProps = {},
  minLength,
  value,
  changeHandler,
}) => {
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    changeHandler((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.value < minLength) {
      setError(true);
    } else {
      setError(false);
    }
  };

  let success = value && value.length >= minLength;

  return (
    <TextField
      {...mainProps}
      {...optionalProps}
      value={value}
      error={error}
      helperText={
        error && `This field must be at least ${minLength} characters long`
      }
      color={success ? "success" : "primary"}
      variant="outlined"
      onChange={handleChange}
      required
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {success && (
              <Check
                sx={{
                  color: "green",
                }}
              />
            )}
          </InputAdornment>
        ),
      }}
    >
      InfoField
    </TextField>
  );
};

export default InfoField;
