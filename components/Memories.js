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
  Alert,
  setPostsNum,
  navigation,
} from "react-native";

import { AppLoading } from "expo";

import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("posts");

import Card from "./Card";
import erasePost from "../data/ErasePost";
const winWidth = Dimensions.get("window").width;

export default function Memories({ fetchData, setFetchData, setPostsNum }) {
  const [posts, setPosts] = React.useState(null);
  const [memories, setMemories] = React.useState(null);
  const [books, setBooks] = React.useState(null);
  const [albums, setAlbums] = React.useState(null);
  const [postsLoaded, setPostsLoaded] = React.useState(false);
  const [viewHeight, setViewHeight] = React.useState(300);

  eraseAlert = (post_id) => {
    Alert.alert(
      "Erase Memory?",
      "Some memories just need to go...",
      [
        {
          text: "Keep",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Erase",
          onPress: () => erasePost(post_id).then(setFetchData(true)),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  async function getData() {
    await db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM memories_db WHERE erased = 0 ORDER BY id DESC",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setMemories(temp);
          setPostsNum(temp.length);
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
    await db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM books ORDER BY id DESC",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setBooks(temp);
        }
      );
    });
    await db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM albums ORDER BY id DESC",
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setAlbums(temp);
        }
      );
    });
  }

  if (fetchData) {
    setFetchData(false);
    getData();
    console.log("the manual refresh is triggered! \n \n \n Yo yo!");
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
              date={element.date}
              posts={posts}
              eraseAlert={eraseAlert}
              post_id={element.id}
              image_id={element.image0}
              image1={element.image1}
              image2={element.image2}
              image3={element.image3}
              image4={element.image4}
              image5={element.image5}
              image6={element.image6}
              image7={element.image7}
              image8={element.image8}
              image9={element.image9}
              book={element.book}
              album={element.album}
              books={books}
              albums={albums}
              navigation={navigation}
            />
          )}
          keyExtractor={(element) => element.id.toString()}
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
