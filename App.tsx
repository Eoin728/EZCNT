import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import WorkoutEditor from "./Pages/workoutEditor";
import HomePage from "./Pages/homepage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "@expo-google-fonts/permanent-marker";
import { PermanentMarker_400Regular } from "@expo-google-fonts/permanent-marker";
import { Text } from "react-native";
import { Quicksand_400Regular } from "@expo-google-fonts/quicksand";

type NavigationStackParamList = {
  HomePage: undefined;
  WorkoutEditor: undefined;
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    PermanentMarker_400Regular,
    Quicksand_400Regular,
  });
  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="HomePage"
          component={HomePage}
        />
        <Stack.Screen
          options={{
            title: "",
            headerTransparent: true,
            headerTintColor: "grey",
          }}
          name="WorkoutEditor"
          component={WorkoutEditor}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
