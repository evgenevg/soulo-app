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
} from "react-native";

export default function Card(props) {
  return (
    <View>
      <View style={styles.content}>
        <Text style={styles.text}>
          The single most important resource that we allocate from one day to
          the next is our own time.
        </Text>
        <Image
          style={styles.image}
          source={require("../assets/data/center.jpg")}
        />
        {/* <Image
          style={styles.image}
          source={require("../assets/data/future.jpg")}
        />
        <Image
          style={styles.image}
          source={require("../assets/data/image.png")}
        /> */}
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
    // maxHeight: 400,
    height: 300,
  },
  extraInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
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
});
