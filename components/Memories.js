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
  Dimensions,
} from "react-native";

import { AppLoading } from "expo";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("posts");

import Card from "./Card";
const winWidth = Dimensions.get("window").width;

export default function Memories() {
  const [posts, setPosts] = React.useState(null);
  const [memories, setMemories] = React.useState(null);
  const [postsLoaded, setPostsLoaded] = React.useState(false);
  const [viewHeight, setViewHeight] = React.useState(300);

  React.useEffect(() => {
    // getData();
  });

  async function getData() {
    // await db.transaction((tx) => {
    //   tx.executeSql(
    //     "SELECT * FROM Images_db ORDER BY id DESC",
    //     [],
    //     (tx, results) => {
    //       var temp = [];
    //       for (let i = 0; i < results.rows.length; ++i) {
    //         temp.push(results.rows.item(i));
    //       }
    //       setPosts(temp);
    //       // setPostsLoaded(true);
    //     }
    //   );
    // });

    await db.transaction((tx) => {
      tx.executeSql("SELECT * FROM test", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        console.log(temp);
        setMemories(temp);
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
              key={element.uri}
              height={element.height}
              width={element.width}
              viewHeight={winWidth * (element.height / element.width)}
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
    </View>
  );
}

const styles = StyleSheet.create({});
