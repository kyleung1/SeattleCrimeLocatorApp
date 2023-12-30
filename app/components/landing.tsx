import { View, Text } from "react-native";
import Mapbox from "./mapbox";

const Landing = () => {
  // console.log(process.env.REACT_APP_MAPBOXKEY);
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
        Find the most recent crime near you
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 15, textAlign: "center" }}>
        Seattle, Washington
      </Text>
      <View
        style={{
          backgroundColor: "lightgreen",
          width: "80%",
          padding: 20,
          borderRadius: 6,
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
