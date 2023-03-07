import {
  Step,
  Stepper,
  Container,
  StepButton,
  Stack,
  Button,
  Box,
} from "@mui/material";

import React, { useState } from "react";
import AddDetails from "./AddDetails";
import AddImages from "./AddImages";
import AddLocation from "./AddLocation";

const AddRoom = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [steps, setSteps] = useState([
    {
      label: "Location",
      completed: false,
    },
    {
      label: "Details",
      completed: false,
    },
    {
      label: "Images",
      completed: false,
    },
  ]);

  const children = [<AddLocation />, <AddDetails />, <AddImages />];
  return (
    <Container sx={{ my: 4 }}>
      <Stepper
        alternativeLabel
        nonLinear
        activeStep={activeStep}
        sx={{ mb: 3 }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={step?.completed}>
            <StepButton onClick={() => setActiveStep(index)}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      {children.map((child, index) => (
        <Box
          sx={{
            display: index === activeStep ? "block" : "none",
          }}
          key={index}
        >
          {child}
        </Box>
      ))}

      <Stack
        direction="row"
        sx={{
          justifyContent: "space-around",
          pt: 2,
          pb: 7,
        }}
      >
        <Button
          color="inherit"
          disabled={!activeStep}
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          Back
        </Button>
        <Button
          color="inherit"
          disabled={activeStep >= steps.length - 1}
          onClick={() => setActiveStep((prev) => prev + 1)}
        >
          Next
        </Button>
      </Stack>
    </Container>
  );
};

export default AddRoom;
