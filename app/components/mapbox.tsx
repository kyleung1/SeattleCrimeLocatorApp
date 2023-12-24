import { useEffect, useState } from "react";

type coordinates = [number, number];

const Mapbox = (props) => {
  const [currentLocation, setStart] = useState<coordinates>([
    -122.3328, 47.6061,
  ]);

  //   mapboxgl.accessToken = process.env.REACT_APP_MAPBOXKEY;
  //   console.log(process.env.REACT_APP_MAPBOXKEY);
  //   useEffect(() => {
  //     const map = new mapboxgl.Map({
  //       container: "map", // container ID
  //       style: "mapbox://styles/mapbox/streets-v12", // style URL
  //       center: currentLocation, // starting position [lng, lat]
  //       zoom: 12, // starting zoom
  //     });

  //     map.on("load", function () {
  //       // gets current location
  //       // navigator.geolocation.getCurrentPosition(startingPosHandler);
  //     });
  //   });
  return (
    <div className="App">
      {/* <head>
      <link href='https://api.mapbox.com/mapbox-gl-js/v3.0.1/mapbox-gl.css' rel='stylesheet' />
    </head> */}
      <div className="center map-container">
        <div id="map"></div>
      </div>
    </div>
  );
};

export default Mapbox;
