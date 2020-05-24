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

export default function DetailView({ route, navigation }) {
  const { text } = route.params;
  return (
    <View
      style={{
        backgroundColor: "#000000",
        position: "absolute",
        zIndex: 101,
        width: "100%",
        height: "100%",
        borderRadius: 20,
        paddingTop: 50,
        paddingHorizontal: 20,
        overflow: "hidden",
      }}
    >
      <View>
        <Text style={{ color: "#fff" }}>{text}</Text>
      </View>
    </View>
  );
}
