import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
// import Geolocation from "react-native-geolocation-service";

type coordinates = [number, number];

const Map = (props) => {
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position);
  //       // setLocation(position);
  //     },
  //     (error) => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //       // setLocation(false);
  //     },
  //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //   );
  // });
  const [currentLocation, setStart] = useState<coordinates>([
    -122.3328, 47.6061,
  ]);

  function geolocate(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
  }
  console.log("hi");
  function geolocatefail() {}

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation[1],
          longitude: currentLocation[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          key={1}
          coordinate={{
            latitude: currentLocation[1],
            longitude: currentLocation[0],
          }}
          title={"test"}
          description={"description"}
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    height: 500,
    width: "100%",
  },
  map: {
    flex: 1,
  },
});
