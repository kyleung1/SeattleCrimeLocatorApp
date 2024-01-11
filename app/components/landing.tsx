import { View, Text, StyleSheet } from "react-native";
import Mapbox from "./mapbox";
import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { TextInput } from "react-native-gesture-handler";

const Landing = () => {
  const [searchInput, setSearch] = useState("");

  useEffect(() => {
    const lockScreenOrientation = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };

    lockScreenOrientation();
  }, []);
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
        100 most recent crimes near you
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
        <Mapbox />
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
