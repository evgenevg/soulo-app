import * as React from "react";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";
import { Easing } from "react-native";

import HomeScreen from "./components/HomeScreen";
import DetailView from "./components/DetailView";
import { ScreenStackHeaderConfig } from "react-native-screens";

// const MyTransition = {
//   gestureDirection: "horizontal",
//   transitionSpec: {
//     open: TransitionSpecs.TransitionIOSSpec,
//     close: TransitionSpecs.TransitionIOSSpec,
//   },
//   cardStyleInterpolator: ({ current, next, layouts }) => {
//     return {
//       cardStyle: {
//         transform: [
//           {
//             translateX: current.progress.interpolate({
//               inputRange: [0, 1],
//               outputRange: [layouts.screen.width, 0],
//             }),
//           },
//           //     {
//           //       scale: next
//           //         ? next.progress.interpolate({
//           //             inputRange: [0, 1],
//           //             outputRange: [1, 0.9],
//           //           })
//           //         : 1,
//           //     },
//         ],
//       },
//       // overlayStyle: {
//       //   opacity: current.progress.interpolate({
//       //     inputRange: [0, 1],
//       //     outputRange: [0, 0.5],
//       //   }),
//       // },
//     };
//   },
// };

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

function App() {
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
          // options={{
          //   title: "Custom animation",
          //   ...MyTransition,
          // }}
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

export default App;
