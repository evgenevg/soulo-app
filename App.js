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
import CreateButton from "./components/CreateButton";
import CreateSheet from "./components/CreateSheet";
import SettingsSheet from "./components/SettingsSheet";

const fetchFonts = () => {
  return Font.loadAsync({
    druk: require("./assets/fonts/druk.otf"),
    sharp: require("./assets/fonts/Sharp.ttf"),
  });
};

export default function App(props) {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [createSheetOpened, setCreateSheetOpened] = React.useState(false);
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const [settingsOpened, setSettingsOpened] = React.useState(false);
  const [fetchData, setFetchData] = React.useState(false);

  toggleCreateSheet = () => {
    if (createSheetOpened) {
      setCreateSheetOpened(false);
      unblurBackground();
    } else {
      setCreateSheetOpened(true);
      blurBackground();
    }
  };

  toggleSettings = () => {
    if (settingsOpened) {
      setSettingsOpened(false);
      unblurBackground();
    } else {
      setSettingsOpened(true);
      blurBackground();
    }
  };

  blurBackground = () => {
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 300,
      easing: Easing.in(),
    }).start();
    Animated.spring(opacity, {
      toValue: 0.5,
    }).start();
  };

  unblurBackground = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration: 300,
      easing: Easing.in(),
    }).start();
    Animated.spring(opacity, {
      toValue: 1,
    }).start();
  };

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
    <Animated.View style={[styles.view]}>
      {createSheetOpened ? (
        <CreateSheet
          opened={createSheetOpened}
          toggleCreateSheet={toggleCreateSheet}
          fetchData={fetchData}
          setFetchData={setFetchData}
        />
      ) : null}

      {settingsOpened ? (
        <SettingsSheet
          opened={settingsOpened}
          toggleSettings={toggleSettings}
        />
      ) : null}
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scale }],
            opacity: opacity,
            height: "100%",
          },
        ]}
      >
        <Profile toggleSettings={toggleSettings} />
        <View style={styles.content}>
          <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.headline}>Memories</Text>
            <Memories fetchData={fetchData} setFetchData={setFetchData} />
          </ScrollView>
        </View>

        <CreateButton toggleCreateSheet={toggleCreateSheet} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#000000",
  },
  container: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
