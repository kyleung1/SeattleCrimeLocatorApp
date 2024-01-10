import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

type coordinates = [number, number];

const Mapbox = (props) => {
  const [currentLocation, setStart] = useState<coordinates>([
    -122.3328, 47.6061,
  ]);

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

export default Mapbox;

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
