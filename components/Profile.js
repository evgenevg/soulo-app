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
  Button,
} from "react-native";

export default function Profile(props) {
  const [tabHeight, setTabHeight] = React.useState(400);
  expandProfile = () => {
    return null;
  };

  condenseProfile = () => {
    return null;
  };

  return (
    <View style={(styles.profile, { height: tabHeight })}>
      {/* <View style={styles.profile}> */}
      <View style={styles.content}>
        <View>
          <TouchableOpacity
            onPress={() => {
              setTabHeight(700);
            }}
          >
            <Image
              style={styles.avatar}
              source={require("../assets/avatar.jpg")}
            />
          </TouchableOpacity>
          <Text style={styles.name}>Freddy Q.</Text>
        </View>
      </View>
      <View style={styles.counterGroup}>
        <View style={styles.counter}>
          <Text style={styles.number}>12</Text>
          <Text style={styles.desc}>Memories</Text>
        </View>
        <View style={styles.counter}>
          <Text style={styles.number}>320</Text>
          <Text style={styles.desc}>Days</Text>
        </View>
        <View style={styles.counter}>
          <Text style={styles.number}>1</Text>
          <Text style={styles.desc}>Life</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profile: {
    backgroundColor: "#FFF",
    paddingTop: 40,
    paddingHorizontal: 20,
    // height: this.tabHeight,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: 60,
    // backgroundColor: "#000000",
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 27,
    marginBottom: 22,
    alignSelf: "center",
  },
  name: {
    fontSize: 40,
    color: "#3B3F43",
    marginBottom: 38,
    alignSelf: "center",
  },
  counter: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 40,
  },
  counterGroup: {
    // flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "center",
  },
  number: {
    fontSize: 27,
    alignSelf: "center",
  },
  desc: {
    fontSize: 15,
    alignSelf: "center",
  },
});
