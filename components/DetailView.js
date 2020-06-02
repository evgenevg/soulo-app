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
  Image,
} from "react-native";

export default function DetailView({ route, navigation }) {
  const {
    text,
    time,
    bookAuthor,
    bookPic,
    bookTitle,
    uri,
    imageHeight,
    timeFrom,
    imageURIs,
    imageHeights,
    colors,
  } = route.params;
  return (
    <View
      style={[styles.sheet, { backgroundColor: colors.backgroundSecondary }]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={[styles.sendButton, { color: colors.textPrimary }]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={[styles.timestamp, { color: colors.textPrimary }]}>
          A memory from {timeFrom}
        </Text>
        {text ? (
          <Text style={[styles.text, { color: colors.textUserGen }]}>
            {text}
          </Text>
        ) : null}
        {bookAuthor ? (
          <View
            style={[
              styles.bookView,
              { backgroundColor: colors.backgroundContent },
            ]}
          >
            <Image style={styles.bookImage} source={{ uri: bookPic }} />
            <View style={{ paddingLeft: 10, paddingRight: 20 }}>
              <Text style={[styles.bookTitle, { color: colors.textSecondary }]}>
                {bookTitle}
              </Text>
              <Text
                style={[styles.bookAuthor, { color: colors.textSmallCaption }]}
              >
                {bookAuthor}
              </Text>
            </View>
          </View>
        ) : null}
        {imageURIs.map((uri, i) => (
          <Image
            style={[styles.image, { height: imageHeights[i] }]}
            source={{ uri: uri }}
            key={i}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: "absolute",
    zIndex: 101,
    width: "100%",
    height: "100%",
    // borderRadius: 20,
    paddingTop: 50,
    paddingHorizontal: 10,
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
  content: {
    width: "100%",
  },
  text: {
    fontSize: 17,
    marginBottom: 20,
    fontFamily: "sharp",
  },
  image: {
    width: "100%",
    marginBottom: 20,
    borderRadius: 15,
    resizeMode: "cover",
    zIndex: 1,
    // maxHeight: 400,
  },
  timestamp: {
    fontSize: 25,
    fontFamily: "druk",
    marginBottom: 30,
  },
  bookView: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 13,
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  bookImage: {
    height: 76,
    width: 56,
    borderRadius: 5,
  },
  bookTitle: {
    fontSize: 15,
    fontFamily: "druk",
  },
  bookAuthor: {
    fontSize: 14,
    fontFamily: "sharp",
  },
});
