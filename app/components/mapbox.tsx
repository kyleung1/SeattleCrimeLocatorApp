import { useEffect, useState } from "react";
import mapboxgl from "@rnmapbox/maps";
import { StyleSheet, View } from "react-native";
import { MAPBOXKEY } from "@env";

type coordinates = [number, number];

const Mapbox = (props) => {
  const [currentLocation, setStart] = useState<coordinates>([
    -122.3328, 47.6061,
  ]);
  console.log(MAPBOXKEY);
  mapboxgl.setAccessToken(MAPBOXKEY);

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
    <View style={styles.page}>
      <View style={styles.mapContainer}>
        <mapboxgl.MapView style={styles.map} />
      </View>
    </View>
  );
};

export default Mapbox;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1,
  },
});
