import React, { useEffect, useRef, useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Paper,
} from "@mui/material";
import { AddLocationAlt, Bed, LocationOn } from "@mui/icons-material";
import ClusterMap from "./map/ClusterMap";
import Rooms from "./Rooms/Rooms";
import AddRoom from "./AddRoom/AddRoom";

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  const children = [<ClusterMap />, <Rooms />, <AddRoom />];

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [value]);

  return (
    <Box ref={ref}>
      {children[value]}
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction label="Map" icon={<LocationOn />} />
          <BottomNavigationAction label="Rooms" icon={<Bed />} />
          <BottomNavigationAction label="Add" icon={<AddLocationAlt />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
