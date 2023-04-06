import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import InfoField from "./InfoField";

const AddDetails = () => {
  const [costType, setCostType] = useState(0);
  const [price, setPrice] = useState(0);
  const [values, setValues] = useState({
    title: "",
    description: "",
  });

  const handleCostChange = (e) => {
    const costTypeNum = Number(e.target.value);
    setCostType(costTypeNum);
  };

  const handlePriceChange = (e) => {
    const priceNum = Number(e.target.value);
    setPrice(priceNum);
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        "& .MuiTextField-root": {
          m: 1,
          width: "100%",
          maxWidth: 500,
        },
      }}
    >
      <FormControl>
        <RadioGroup
          name="costType"
          value={costType}
          row
          onChange={handleCostChange}
        >
          <FormControlLabel value={0} control={<Radio />} label="Free Stay" />
          <FormControlLabel value={1} control={<Radio />} label="Paid Stay" />
          {Boolean(costType) && (
            <TextField
              value={price}
              onChange={handlePriceChange}
              name="price"
              sx={{
                width: "7 inch !important",
                variant: "standard",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              inputProps={{
                type: "number",
                min: 1,
                max: 50,
              }}
            />
          )}
        </RadioGroup>
      </FormControl>
      <InfoField
        mainProps={{
          name: "title",
          label: "Title",
        }}
        minLength={5}
        value={values?.title}
        changeHandler={setValues}
      />
      <InfoField
        mainProps={{
          name: "description",
          label: "Description",
        }}
        minLength={10}
        optionalProps={{
          multiline: true,
          rows: 4,
        }}
        value={values?.description}
        changeHandler={setValues}
      />
    </Stack>
  );
};

export default AddDetails;
