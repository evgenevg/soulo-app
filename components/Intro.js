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
  Image,
  TextInput,
  AppRegistry,
} from "react-native";

import { useColorScheme } from "react-native-appearance";
import Swiper from "react-native-swiper";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import ColorSchemes from "../ColorSchemes.js";
import Onboarding from "./Onboarding.js";

const fetchFonts = () => {
  return Font.loadAsync({
    druk: require("../assets/fonts/druk.otf"),
    sharp: require("../assets/fonts/Sharp.ttf"),
  });
};

export default function Intro() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  const colorScheme = useColorScheme();
  const colors = ColorSchemes[colorScheme] || ColorSchemes.light;

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
    <Swiper
      style={styles.wrapper}
      showsButtons={true}
      loop={false}
      nextButton={
        <Text
          style={[
            styles.nextButton,
            { fontFamily: "druk", color: colors.textPrimary },
          ]}
        >
          Next
        </Text>
      }
      prevButton={<Text></Text>}
      activeDotColor={colors.textSecondary}
      buttonWrapperStyle={{
        bottom: 500,
        paddingHorizontal: 20,
        paddingVertical: 50,
        flex: 0,
        position: "absolute",
        alignItems: "flex-end",
      }}
    >
      <View
        style={[styles.slide, { backgroundColor: colors.backgroundSecondary }]}
      >
        <Image
          style={styles.image}
          source={require("../assets/icons/searchlater.png")}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.text,
            { color: colors.textSecondary, fontFamily: "druk" },
          ]}
        >
          Social media can be overwhelming...
        </Text>
      </View>
      <View
        style={[styles.slide, { backgroundColor: colors.backgroundSecondary }]}
      >
        <Image
          style={styles.image}
          source={require("../assets/icons/searchlater.png")}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.text,
            { color: colors.textSecondary, fontFamily: "druk" },
          ]}
        >
          Soulo is stress and distraction free...
        </Text>
      </View>
      <View
        style={[styles.slide, { backgroundColor: colors.backgroundSecondary }]}
      >
        <Image
          style={styles.image}
          source={require("../assets/icons/searchlater.png")}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.text,
            { color: colors.textSecondary, fontFamily: "druk" },
          ]}
        >
          Become more mindful and invest in your most precious moments...
        </Text>
      </View>
      <Onboarding colors={colors} />
    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  text: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "center",
    width: "90%",
  },
  image: {
    width: "90%",
    maxHeight: 300,
    marginBottom: 50,
  },
  nextButton: {
    fontSize: 17,
  },
});

AppRegistry.registerComponent("myproject", () => SwiperComponent);
