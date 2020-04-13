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
      <Card />
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
