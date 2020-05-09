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
} from "react-native";

import FitImage from "react-native-fit-image";

const winWidth = Dimensions.get("window").width;
// const winHeight = Dimensions.get("window").height;

export default function Card({ source, text, sourceArray, image_id, posts }) {
  // const [imageWidth, setImageWidth] = React.useState(0);
  const [imageHeight, setImageHeight] = React.useState(0);
  const [uri, setUri] = React.useState(null);

  const [galleryHidden, setGalleryHidden] = React.useState(true);

  React.useEffect(() => {
    sourceArray ? setGalleryHidden(false) : null;
  });

  if (image_id && !uri) {
    setUri(posts.find((x) => x.image_id === image_id).uri);
    height = posts.find((x) => x.image_id === image_id).height;
    width = posts.find((x) => x.image_id === image_id).width;
    viewHeight = winWidth * (height / width);
    setImageHeight(viewHeight);
  }

  return (
    <View>
      <View style={styles.content}>
        {text ? <Text style={styles.text}>{text}</Text> : null}
        <View>
          {!galleryHidden ? (
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
        <Text style={styles.timestamp}>Yesterday at 9:20 PM</Text>
        <TouchableOpacity>
          <Image
            style={styles.moreIcon}
            source={require("../assets/icons/more.png")}
          />
        </TouchableOpacity>
      </View>
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
});
