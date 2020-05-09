import React, { memo } from "react";
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
  FlatList,
} from "react-native";

import { AppLoading } from "expo";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("posts");

import Card from "./Card";
const winWidth = Dimensions.get("window").width;

export default function Memories({ fetchData, setFetchData }) {
  const [posts, setPosts] = React.useState(null);
  const [memories, setMemories] = React.useState(null);
  const [postsLoaded, setPostsLoaded] = React.useState(false);
  const [viewHeight, setViewHeight] = React.useState(300);

  React.useEffect(() => {});

  async function getData() {
    await db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM memories ORDER BY id DESC",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setMemories(temp);
        }
      );
    });
    await db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM imgs ORDER BY id DESC",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setPosts(temp);
        }
      );
    });
  }

  if (fetchData) {
    getData();
    console.log("the manual refresh is triggered! \n \n \n Yo yo!");
    setFetchData(false);
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
      {memories && posts ? (
        <FlatList
          data={memories}
          ListHeaderComponent={<Text style={styles.headline}>Memories</Text>}
          renderItem={({ item: element }) => (
            <Card
              key={element.id}
              text={element.text}
              posts={posts}
              // source={{
              //   uri: posts.find((x) => x.image_id === element.image0).uri,
              // }}
              image_id={element.image0}
            />
          )}
          keyExtractor={(element) => element.id}
          showsVerticalScrollIndicator={false}
        />
      ) : null}
      {/* {posts
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
        : console.log("loading")} */}

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
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    height: "100%",
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  headline: {
    fontSize: 35,
    color: "#000000",
    marginTop: 45,
    marginBottom: 40,
    fontFamily: "druk",
  },
});
