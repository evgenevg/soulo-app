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
} from "react-native";
import Card from "./Card";

export default function Memories() {
  return (
    <View>
      <Card
        source={require("../assets/data/center.jpg")}
        text={
          "The single most important resource that we allocate from one day to the next is our own time."
        }
      />
      <Card source={require("../assets/data/future.jpg")} sourceArray="hey" />
      <Card source={require("../assets/data/image.png")} text={"I love art!"} />
      <Card
        source={require("../assets/data/me.jpg")}
        text={"Luke, I am your father"}
      />
      <View style={styles.rec1}></View>
      <View style={styles.rec1}></View>
      <View style={styles.rec1}></View>
      <View style={styles.rec1}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  rec1: {
    height: 300,
    width: "100%",
    backgroundColor: "#000000",
    alignItems: "center",
    marginTop: 40,
    borderRadius: 15,
  },
});
