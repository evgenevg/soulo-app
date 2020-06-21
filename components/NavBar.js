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
  LayoutAnimation,
  Image,
  Icon,
} from "react-native";
import CreateButton from "./CreateButton";

export default function NavBar({
  toggleCreateSheet,
  toggleSettings,
  toggleSearch,
  colors,
}) {
  const searchSize = React.useRef(new Animated.Value(38)).current;
  const settingsSize = React.useRef(new Animated.Value(45)).current;

  searchTouch = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(10, "easeInEaseOut", "scaleXY")
    );
    Animated.spring(searchSize, {
      toValue: 30,
    }).start();
  };

  searchRelease = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(10, "easeInEaseOut", "scaleXY")
    );
    Animated.spring(searchSize, {
      toValue: 38,
    }).start();
    toggleSearch();
  };

  settingsTouch = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(10, "easeInEaseOut", "scaleXY")
    );
    Animated.spring(settingsSize, {
      toValue: 35,
    }).start();
  };

  settingsRelease = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(10, "easeInEaseOut", "scaleXY")
    );
    Animated.spring(settingsSize, {
      toValue: 45,
    }).start();
    toggleSettings();
  };

  return (
    <View style={styles.view}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPressIn={() => searchTouch()}
          onPressOut={() => searchRelease()}
          activeOpacity={1}
        >
          <Animated.Image
            source={require("../assets/icons/search.png")}
            style={{
              height: searchSize,
              width: searchSize,
              tintColor: colors.textPrimary,
            }}
          />
        </TouchableOpacity>
      </View>
      <CreateButton toggleCreateSheet={toggleCreateSheet} colors={colors} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPressIn={() => settingsTouch()}
          onPressOut={() => settingsRelease()}
          activeOpacity={1}
        >
          <Animated.Image
            source={require("../assets/icons/settings.png")}
            style={{
              height: settingsSize,
              width: settingsSize,
              tintColor: colors.textPrimary,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: 30,
    height: 70,
  },
  buttonContainer: {
    marginHorizontal: 15,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 45,
  },
  settings: {
    // height: 45,
    // width: 45,
  },
  search: {
    // height: 38,
    // width: 38,
  },
});
