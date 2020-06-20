import * as React from "react";
import { Button, View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

import HomeScreen from "./HomeScreen";
import DetailView from "./DetailView";

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 5000,
    mass: 5,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Details"
          component={DetailView}
          options={{
            transitionSpec: {
              open: config,
              close: config,
            },
          }}
          animationEnabed={true}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
