import { Google } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

const GoogleOneTap = () => {
  return (
    <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}>
      <Button variant="outlined" startIcon={<Google />}>
        Log in with Google
      </Button>
    </a>
  );
};

export default GoogleOneTap;
