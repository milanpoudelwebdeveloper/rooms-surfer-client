import MapBoxGeoCoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

const GeoCodeSearch = ({ setLatitude, setLongitude }) => {
  const control = new MapBoxGeoCoder({
    accessToken: process.env.NEXT_PUBLIC_MAP_ACCESS_KEY,
    marker: false,
    collapsed: true,
  });
  useControl(() => control);

  control.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    setLatitude(coords[1]);
    setLongitude(coords[0]);
  });

  return null;
};

export default GeoCodeSearch;
