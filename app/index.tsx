import { Stack, useRouter } from "expo-router";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import Landing from "./components/landing";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "lightgrey" },
          headerShadowVisible: false,
          headerTitle: "Seattle Crime Locator",
          headerTitleAlign: "center",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <Landing />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
