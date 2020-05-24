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
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  navigation,
} from "react-native";

var moment = require("moment");

import FitImage from "react-native-fit-image";
import { useNavigation } from "@react-navigation/native";

const winWidth = Dimensions.get("window").width;
// const winHeight = Dimensions.get("window").height;

export default function Card({
  source,
  text,
  sourceArray,
  image_id,
  posts,
  date,
  eraseAlert,
  post_id,
  image1,
  book,
  books,
}) {
  // const [imageWidth, setImageWidth] = React.useState(0);
  const [imageHeight, setImageHeight] = React.useState(0);
  const [uri, setUri] = React.useState(null);
  const [time, setTime] = React.useState(null);
  const [bookTitle, setBookTitle] = React.useState("");
  const [bookAuthor, setBookAuthor] = React.useState("");
  const [bookPic, setBookPic] = React.useState("");
  const [galleryHidden, setGalleryHidden] = React.useState(true);

  const navigation = useNavigation();

  React.useEffect(() => {
    sourceArray ? setGalleryHidden(false) : null;
  });

  if (image_id && !uri) {
    console.log(image_id);
    try {
      setUri(posts.find((x) => x.image_id === image_id).uri);
      height = posts.find((x) => x.image_id === image_id).height;
      width = posts.find((x) => x.image_id === image_id).width;
      viewHeight = winWidth * (height / width);
      setImageHeight(viewHeight);
    } catch (error) {
      console.log(error);
    }
  }

  if (book && !bookAuthor) {
    try {
      setBookTitle(books.find((x) => x.book_id === book).title);
      setBookAuthor(books.find((x) => x.book_id === book).author);
      setBookPic(books.find((x) => x.book_id === book).image_uri);
    } catch (error) {
      console.log(error);
    }
  }

  if (!time) {
    postDate = moment(date, "YYYY-MM-DD hh:mm:ss").calendar();
    setTime(postDate);
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Details", { text: text })}
      >
        <View style={styles.content}>
          {text ? <Text style={styles.text}>{text}</Text> : null}
          {bookAuthor ? (
            <View style={styles.bookView}>
              <Image style={styles.bookImage} source={{ uri: bookPic }} />
              <View style={{ paddingLeft: 10, paddingRight: 20 }}>
                <Text style={styles.bookTitle}>{bookTitle}</Text>
                <Text style={styles.bookAuthor}>{bookAuthor}</Text>
              </View>
            </View>
          ) : null}
          <View>
            {image1 ? (
              <TouchableOpacity style={{ zIndex: 10 }}>
                <Image
                  style={styles.galleryIcon}
                  source={require("../assets/icons/gallery.png")}
                />
              </TouchableOpacity>
            ) : null}
            {/* <Image
            style={[styles.image, { height: viewHeight }]}
            source={source}
          /> */}
            {uri ? (
              <Image
                style={[styles.image, { height: imageHeight }]}
                source={{ uri: uri }}
              />
            ) : null}
          </View>
        </View>
        {/* content can be an image, a text or anything else */}
        <View style={styles.extraInfo}>
          <Text style={styles.timestamp}>{time}</Text>
          <TouchableOpacity onPress={() => eraseAlert(post_id)}>
            <Image
              style={styles.moreIcon}
              source={require("../assets/icons/more.png")}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: "100%",
  },
  text: {
    fontSize: 17,
    marginBottom: 20,
    color: "#22272C",
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
  extraInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 60,
  },
  timestamp: {
    fontSize: 12,
    color: "#3B3F43",
    fontFamily: "sharp",
  },
  moreIcon: {
    width: 20,
    height: 8,
  },
  galleryIcon: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 15,
    top: 15,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  bookView: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 13,
    backgroundColor: "#F1F1F1",
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
    color: "#3B3F43",
  },
  bookAuthor: {
    fontSize: 14,
    fontFamily: "sharp",
    color: "#5C6369",
  },
});
