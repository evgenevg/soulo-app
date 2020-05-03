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
  useState,
  useEffect,
} from "react-native";

import { AppLoading } from "expo";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("posts");

import Card from "./Card";

export default function Memories() {
  const [posts, setPosts] = React.useState(null);
  const [postsLoaded, setPostsLoaded] = React.useState(false);

  React.useEffect(() => {
    // getData();
  });

  async function getData() {
    await db.transaction((tx) => {
      tx.executeSql("SELECT * FROM DataTable", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setPosts(temp);
        setPostsLoaded(true);
      });
    });
  }

  if (!postsLoaded) {
    return (
      <AppLoading
        startAsync={getData}
        onFinish={() => setPostsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <View>
      {posts
        ? posts.map((element) => (
            <Card
              source={{
                uri: element.uri,
              }}
            />
          ))
        : console.log("loading")}
      {/* <Card
        source={{
          uri: posts[0].uri,
        }}
      /> */}

      <Card
        source={require("../assets/data/center.jpg")}
        text={
          "The single most important resource that we allocate from one day to the next is our own time."
        }
      />
      {/* <Card
        source={{
          uri: "",
        }}
      /> */}
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
