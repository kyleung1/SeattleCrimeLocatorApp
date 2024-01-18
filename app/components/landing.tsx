import { View, Text, StyleSheet } from "react-native";
import Map from "./map";
import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { TextInput } from "react-native-gesture-handler";

type coordinates = [number, number];
interface LocationData {
  addresstype: string;
  boundingbox: [string, string, string, string];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  name: string;
  osm_id: number;
  osm_type: string;
  place_id: number;
  place_rank: number;
  type: string;
}

const Landing = () => {
  const [searchInput, setSearch] = useState("");
  const [searchCoords, setSC] = useState<coordinates | null>([
    -122.3328, 47.6061,
  ]); // lon, lat

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };

    lockScreenOrientation();
  }, []);

  async function handleSearch() {
    const geocodeRequest = await fetch(
      "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
        searchInput
    );
    const geocodeData: LocationData[] = await geocodeRequest.json();
    if (geocodeData)
      setSC([parseFloat(geocodeData[0].lon), parseFloat(geocodeData[0].lat)]);
    // console.log(searchCoords);
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Recent crimes within 1 mile of you
      </Text>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 15,
          textAlign: "center",
          marginVertical: 10,
        }}
      >
        Seattle, Washington
      </Text>
      <Text>Find a location</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Address"
          onChangeText={(value) => setSearch(value)}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          value={searchInput}
        />
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Map searchCoords={searchCoords} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    height: 40,
    minWidth: 300,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "lightgray",
  },
});

export default Landing;
