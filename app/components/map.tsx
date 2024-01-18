import { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

type coordinates = [number, number];
interface CrimeData {
  beat: string;
  crime_against_category: string;
  group_a_b: string;
  latitude: string;
  longitude: string;
  mcpp: string;
  offense: string;
  offense_code: string;
  offense_end_datetime: string;
  offense_id: string;
  offense_parent_group: string;
  offense_start_datetime: string;
  precinct: string;
  report_datetime: string;
  report_number: string;
  sector: string;
  distance?: number;
  _100_block_address?: string;
}
interface MapProps {
  searchCoords?: coordinates;
}

const Map = (MapProps: MapProps) => {
  const mapViewRef = useRef(null);
  const [currentLocation, setStart] = useState<coordinates>([
    -122.3328, 47.6061,
  ]); // lon, lat
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dataState, setData] = useState<CrimeData[] | null>(null);
  const [localCrimes, setLC] = useState<CrimeData[] | null>([]);

  useEffect(() => {
    setStart(MapProps.searchCoords);
    console.log(MapProps);
  }, [MapProps]);

  useEffect(() => {
    const lat = currentLocation[1];
    const lon = currentLocation[0];
    mapViewRef.current.animateToRegion({ latitude: lat, longitude: lon }, 1000);
    fetchCrimes();
    console.log(localCrimes.length);
  }, [currentLocation]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      setStart([lon, lat]);
      mapViewRef.current.animateToRegion(
        { latitude: lat, longitude: lon },
        1000
      );
    })();

    fetchCrimes();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  async function fetchCrimes() {
    const request = await fetch(
      "https://data.seattle.gov/resource/tazs-3rd5.json?$order=report_datetime%20DESC&$limit=100"
    );
    const data: CrimeData[] = await request.json();
    if (data)
      data.forEach((incident) => {
        let c_lon = incident.longitude;
        let c_lat = incident.latitude;
        incident["distance"] = distance(
          parseFloat(c_lon),
          parseFloat(c_lat),
          currentLocation[0],
          currentLocation[1]
        );
      });
    setData(data);

    if (dataState)
      dataState.forEach((crime) => {
        if (crime.distance <= 1609.34) {
          let crimeArray: CrimeData[] = [];
          crimeArray.push(crime);
          setLC(crimeArray);
        }
      });
  }

  //https://www.movable-type.co.uk/scripts/latlong.html
  function distance(lon1: number, lat1: number, lon2: number, lat2: number) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      const R = 6371e3;
      const phi1 = (lat1 * Math.PI) / 180;
      const phi2 = (lat2 * Math.PI) / 180;
      const cphi = ((lat2 - lat1) * Math.PI) / 180;
      const lamb = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(cphi / 2) * Math.sin(cphi / 2) +
        Math.cos(phi1) *
          Math.cos(phi2) *
          Math.sin(lamb / 2) *
          Math.sin(lamb / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = R * c; // in metres
      return d;
    }
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapViewRef}
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
          title={"Your Location"}
          description={"description"}
        />
        {localCrimes?.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(marker.latitude),
              longitude: parseFloat(marker.longitude),
            }}
            title={marker.offense_parent_group}
            description={marker.offense_parent_group + " " + marker.distance}
          />
        ))}
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
