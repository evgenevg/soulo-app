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

import { useColorScheme } from "react-native-appearance";

import * as Font from "expo-font";
import { AppLoading } from "expo";
import "react-native-gesture-handler";

import Profile from "./Profile";
import Memories from "./Memories";
import CreateButton from "./CreateButton";
import CreateSheet from "./CreateSheet";
import SettingsSheet from "./SettingsSheet";
import ColorSchemes from "../ColorSchemes.js";

const fetchFonts = () => {
  return Font.loadAsync({
    druk: require("../assets/fonts/druk.otf"),
    sharp: require("../assets/fonts/Sharp.ttf"),
  });
};

export default function HomeScreen({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const [createSheetOpened, setCreateSheetOpened] = React.useState(false);
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const [settingsOpened, setSettingsOpened] = React.useState(false);
  const [fetchData, setFetchData] = React.useState(false);
  const [postsNum, setPostsNum] = React.useState(0);
  const [profileData, setProfileData] = React.useState(0);

  const colorScheme = useColorScheme();
  const colors = ColorSchemes[colorScheme] || ColorSchemes.light;

  toggleCreateSheet = async () => {
    if (createSheetOpened) {
      setCreateSheetOpened(false);
      unblurBackground();
    } else {
      setCreateSheetOpened(true);
      blurBackground();
    }
    return true;
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
    <Animated.View
      style={[styles.view, { backgroundColor: colors.backgroundPrimary }]}
    >
      {createSheetOpened ? (
        <CreateSheet
          opened={createSheetOpened}
          toggleCreateSheet={toggleCreateSheet}
          fetchData={fetchData}
          setFetchData={setFetchData}
          colors={colors}
        />
      ) : null}

      <SettingsSheet
        opened={settingsOpened}
        toggleSettings={toggleSettings}
        profileData={profileData}
        setProfileData={setProfileData}
        colors={colors}
      />
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: scale }],
            opacity: opacity,
            height: "100%",
          },
          { backgroundColor: colors.backgroundPrimary },
        ]}
      >
        <Profile
          toggleSettings={toggleSettings}
          postsNum={postsNum}
          profileData={profileData}
          setProfileData={setProfileData}
          colors={colors}
        />
        <View
          style={[
            styles.content,
            {
              backgroundColor: colors.backgroundPrimary,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <View style={styles.scroll}>
            <Memories
              fetchData={fetchData}
              setFetchData={setFetchData}
              setPostsNum={setPostsNum}
              navigation={navigation}
              colors={colors}
            />
          </View>
        </View>

        <CreateButton toggleCreateSheet={toggleCreateSheet} colors={colors} />
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  content: {
    minHeight: 200,
    flexGrow: 1,
    flex: 1,
    alignContent: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowOffset: { width: 0, height: -7 },
    shadowOpacity: 0.07,
    shadowRadius: 15,
    elevation: 30,
  },
  scroll: {
    height: "100%",
    marginHorizontal: 20,
  },
});
