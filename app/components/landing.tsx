import { View, Text } from "react-native";
import Mapbox from "./mapbox";
import React from "react";

const Landing = () => {
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
      <Text style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}>
        Seattle, Washington
      </Text>
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

export default Landing;
