import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import WorkoutEditor from "./Pages/workoutEditor";
import HomePage from "./Pages/homepage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type NavigationStackParamList = {
    HomePage: undefined;
    WorkoutEditor: undefined;
};

const Stack = createNativeStackNavigator<NavigationStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen name="HomePage" component={HomePage} />
                <Stack.Screen name="WorkoutEditor" component={WorkoutEditor} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
