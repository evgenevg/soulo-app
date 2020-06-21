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
  colors,
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
    <Animated.View
      style={[
        styles.sheet,
        { top: top, backgroundColor: colors.backgroundOther },
      ]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={closeSheet}>
          <Text style={[styles.sendButton, { color: colors.textPrimary }]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          data={result}
          keyExtractor={(item) => item.title.toString() + uuidv4()}
          ListHeaderComponent={
            <View
              style={[
                styles.section,
                { backgroundColor: colors.backgroundPrimary },
              ]}
            >
              <Image
                style={[styles.icon, { tintColor: colors.textPrimary }]}
                source={require("../assets/icons/search.png")}
              />
              <TextInput
                ref={this.inputRef}
                style={styles.input}
                placeholder="What are you looking for?"
                placeholderTextColor={colors.textPrimary}
                keyboardAppearance="dark"
                selectionColor={colors.textPrimary}
                color={colors.textPrimary}
                autoFocus={true}
                value={query}
                onChangeText={(query) => setQuery(query)}
                onSubmitEditing={getData}
              />
            </View>
          }
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
                  <Text
                    style={{ fontWeight: "bold", color: colors.textPrimary }}
                  >
                    {item.title}
                  </Text>
                  <Text style={{ color: colors.textPrimary }}>
                    {item.author}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
        {loading ? <ActivityIndicator size="large" /> : null}
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
    zIndex: 101,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    paddingTop: 50,
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  topBar: {
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sendButton: {
    fontSize: 17,
    fontFamily: "druk",
  },
  section: {
    width: "100%",
    height: 60,
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    opacity: 0.5,
    marginBottom: 50,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 20,
    opacity: 0.2,
  },
  input: {
    fontSize: 17,
    fontFamily: "sharp",
    width: "100%",
    // paddingBottom: 30,
  },
});
