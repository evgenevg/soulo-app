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
  Image,
  FlatList,
  useState,
  useRef,
  useEffect,
  Button,
  LayoutAnimation,
  UIManager,
  Dimensions,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { AppLoading } from "expo";
const { v4: uuidv4 } = require("uuid");

import searchBooks from "../api/BookSearch.js";
import AlbumSearch from "../api/AlbumSearch.js";

const screenHeight = Dimensions.get("window").height;

export default function Search({
  opened,
  toggleSearch,
  setBook,
  setAlbum,
  searchType,
}) {
  const top = React.useRef(new Animated.Value(screenHeight)).current;
  const [result, setResult] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  inputRef = React.createRef();

  toggleSheet = () => {
    // this.focusInputWithKeyboard();
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

  getData = async () => {
    if (searchType === "book") {
      await getBooks();
    } else {
      await getAlbums();
    }
  };

  getBooks = async () => {
    setLoading(true);
    books = await searchBooks(query);
    setResult(books);
    setLoading(false);
  };

  getAlbums = async () => {
    setLoading(true);
    albums = await AlbumSearch(query);
    setResult(albums);
    setLoading(false);
  };

  selectItem = (title, author, image) => {
    if (searchType === "book") {
      payload = [title, author[0], image];
      setBook(payload);
    } else {
      payload = [title, author, image];
      setAlbum(payload);
    }
    closeSheet();
  };

  return (
    <Animated.View style={[styles.sheet, { top: top }]}>
      <TextInput
        ref={this.inputRef}
        style={styles.input}
        placeholder="What are you looking for?"
        keyboardAppearance="dark"
        selectionColor="#000000"
        autoFocus={true}
        value={query}
        onChangeText={(query) => setQuery(query)}
        onSubmitEditing={getData}
      />
      <View>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={result}
            keyExtractor={(item) => item.title.toString() + uuidv4()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => selectItem(item.title, item.author, item.image)}
              >
                <View style={{ paddingBottom: 50, flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 50, width: 50 }}
                  />
                  <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                    <Text>{item.author}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {/* {result ? (
          <FlatList
            style={{ width: "100%" }}
            data={result}
            keyExtractor={(item) => item.title.toString() + uuidv4()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  selectItem(item.title, item.author[0], item.image)
                }
              >
                <View style={{ paddingBottom: 50, flexDirection: "row" }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{ height: 50, width: 50 }}
                  />
                  <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                    <Text>{item.author}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : null} */}
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
    backgroundColor: "#d4e1ef",
  },
  input: {
    fontSize: 20,
    fontFamily: "sharp",
    paddingBottom: 30,
  },
});
