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
  Dimensions,
  AnimatedContainer,
  Title,
  Subtitle,
  Button,
  TextInput,
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import updateName from "../data/UpdateName";
import AvatarPicker from "./AvatarPicker";

import * as SQLite from "expo-sqlite";
import createProfile from "../data/CreateProfile";
const db = SQLite.openDatabase("profile_db");
var moment = require("moment");

const screenHeight = Dimensions.get("window").height;

export default function SearchSheet({ opened, toggleSearch, colors }) {
  const top = React.useRef(new Animated.Value(screenHeight)).current;

  toggleSheet = () => {
    Animated.spring(top, {
      toValue: 60,
      speed: 10,
      bounciness: 4,
    }).start();
  };

  closeSheet = () => {
    Animated.spring(top, {
      toValue: screenHeight,
      speed: 6,
      bounciness: 2,
    }).start();
    toggleSearch();
    Keyboard.dismiss();
  };

  if (opened) {
    toggleSheet();
  }

  return (
    <Animated.View
      style={[
        styles.sheet,
        { top: top, backgroundColor: colors.backgroundSecondary },
      ]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={closeSheet}>
          <Text style={[styles.sendButton, { color: colors.textPrimary }]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.section, { backgroundColor: colors.backgroundPrimary }]}
      >
        <Image
          style={[styles.icon, { tintColor: colors.textPrimary }]}
          source={require("../assets/icons/search.png")}
        />
        <TextInput
          style={styles.input}
          placeholder="What are you looking for?"
          placeholderTextColor={colors.textPrimary}
          keyboardAppearance="dark"
          selectionColor={colors.textPrimary}
          editable="false"
        />
      </View>
      <View style={styles.placeholder}>
        <Image
          style={styles.image}
          source={require("../assets/icons/searchlater.png")}
        />
        <Text style={[styles.placeholderText, { color: colors.textPrimary }]}>
          Keep sharing to unlock search ☀️
        </Text>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    paddingTop: 50,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  topBar: {
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sendButton: {
    fontSize: 17,
    fontFamily: "druk",
  },
  section: {
    width: "100%",
    height: 60,
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    opacity: 0.5,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 20,
    opacity: 0.2,
  },
  input: {
    fontSize: 17,
    fontFamily: "sharp",
    opacity: 0.2,
    // paddingBottom: 30,
  },
  placeholder: {
    marginTop: 70,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 255,
    height: 191,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 30,
    fontFamily: "sharp",
  },
});
