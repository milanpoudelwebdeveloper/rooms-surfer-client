import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import GeoCodeSearch from "./GeoCodeSearch";

const AddLocation = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const ref = useRef(null);

  useEffect(() => {
    if (!latitude && !longitude) {
      //get current location using ip
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          ref.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          setLatitude(data.latitude);
          setLongitude(data.longitude);
        });
    }
  }, []);

  return (
    <Box
      sx={{
        height: 400,
        position: "relative",
      }}
    >
      <ReactMapGL
        ref={ref}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_ACCESS_KEY}
        initialViewState={{
          latitude: latitude,
          longitude: longitude,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={latitude}
          longitude={longitude}
          draggable
          onDragEnd={(e) => {
            setLatitude(e.lngLat.lat);
            setLongitude(e.lngLat.lng);
          }}
          style={{
            zIndex: 100,
          }}
        />

        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) => {
            setLatitude(e.coords.latitude);
            setLongitude(e.coords.longitude);
          }}
          showAccuracyCircle={false}
        />
        <GeoCodeSearch setLatitude={setLatitude} setLongitude={setLongitude} />
      </ReactMapGL>
    </Box>
  );
};

export default AddLocation;
