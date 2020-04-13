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
} from "react-native";
import Profile from "./components/Profile";

// import { styles as s } from "react-native-style-tachyons";

export default function App(props) {
  return (
    <View style={styles.view}>
      <Profile />
      <View style={styles.content}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.headline}>Memories</Text>
          <View style={styles.rec1}></View>
          <View style={styles.rec1}></View>
          <View style={styles.rec1}></View>
          <View style={styles.rec1}></View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FFF",
    // alignItems: "center",
    // justifyContent: "center",
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
    // should move down on scroll
  },
  scroll: {
    height: "100%",
    marginHorizontal: 20,
  },
  rec1: {
    height: 300,
    width: "100%",
    backgroundColor: "#000000",
    alignItems: "center",
    marginTop: 40,
    borderRadius: 15,
  },
  headline: {
    fontSize: 35,
    color: "#000000",
    marginTop: 45,
  },
});
