import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  TouchableWithoutFeedback,
  FlatList,
  useState,
  useRef,
  useEffect,
} from "react-native";

import * as Font from "expo-font";
import { AppLoading } from "expo";

import Profile from "./components/Profile";
import Memories from "./components/Memories";

const fetchFonts = () => {
  return Font.loadAsync({
    druk: require("./assets/fonts/druk.otf"),
    sharp: require("./assets/fonts/Sharp.ttf"),
  });
};

export default function App(props) {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <View style={styles.view}>
      <Profile />
      <View style={styles.content}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.headline}>Memories</Text>
          <Memories />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  content: {
    minHeight: 200,
    flexGrow: 1,
    flex: 1,
    alignContent: "center",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -7 },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 30,
  },
  scroll: {
    height: "100%",
    marginHorizontal: 20,
  },
  headline: {
    fontSize: 35,
    color: "#000000",
    marginTop: 45,
    marginBottom: 40,
    fontFamily: "druk",
  },
});
