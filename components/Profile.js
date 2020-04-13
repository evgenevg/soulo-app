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
  Button,
  LayoutAnimation,
  UIManager,
} from "react-native";

export default function Profile(props) {
  const tabHeight = React.useRef(new Animated.Value(450)).current;
  const avatarSize = React.useRef(new Animated.Value(150)).current;
  const avatarRadius = React.useRef(new Animated.Value(27)).current;
  const nameSize = React.useRef(new Animated.Value(40)).current;
  const [contentFlex, setContentFlex] = React.useState("column");
  // const contentFlex = React.useRef(new Animated.Value("column")).current;
  const [contentAlign, setContentAlign] = React.useState("center");
  // const contentAlign = React.useRef(new Animated.Value("center")).current;
  const avatarMargin = React.useRef(new Animated.Value(22)).current;
  const [profileExpanded, setProfileExpanded] = React.useState(true);

  //Making sure the animations will work on Android
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  expandProfile = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, "easeInEaseOut", "opacity")
    );
    Animated.spring(tabHeight, {
      toValue: 450,
    }).start();
    Animated.spring(avatarSize, {
      toValue: 150,
    }).start();
    Animated.spring(avatarRadius, {
      toValue: 27,
    }).start();
    Animated.spring(nameSize, {
      toValue: 40,
    }).start();
    setContentFlex("column");
    setContentAlign("center");
    Animated.spring(avatarMargin, {
      toValue: 22,
    }).start();
    setProfileExpanded(true);
  };

  condenseProfile = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    Animated.spring(tabHeight, {
      toValue: 150,
    }).start();
    Animated.spring(avatarSize, {
      toValue: 64,
    }).start();
    Animated.spring(avatarRadius, {
      toValue: 12,
    }).start();
    Animated.spring(nameSize, {
      toValue: 30,
    }).start();
    setContentFlex("row");
    setContentAlign("flex-start");
    Animated.spring(avatarMargin, {
      toValue: 0,
    }).start();
    setProfileExpanded(false);
  };

  return (
    <Animated.View style={[styles.profile, { height: tabHeight }]}>
      {/* <View style={styles.profile}> */}
      <Animated.View style={[styles.content, { alignItems: contentAlign }]}>
        <Animated.View
          style={{
            flexDirection: contentFlex,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              profileExpanded ? condenseProfile() : expandProfile();
            }}
          >
            <Animated.Image
              style={[
                styles.avatar,
                {
                  height: avatarSize,
                  width: avatarSize,
                  borderRadius: avatarRadius,
                  marginBottom: avatarMargin,
                },
              ]}
              source={require("../assets/avatar.jpg")}
            />
          </TouchableOpacity>
          <Animated.Text style={[styles.name, { fontSize: nameSize }]}>
            Freddy Q.
          </Animated.Text>
        </Animated.View>
      </Animated.View>
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
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  profile: {
    backgroundColor: "#FFF",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  content: {
    justifyContent: "center",
    width: "100%",
    paddingTop: 20,
    marginBottom: 38,
  },
  avatar: {
    alignSelf: "center",
  },
  name: {
    color: "#3B3F43",
    alignSelf: "center",
    marginHorizontal: 20,
  },
  counter: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 40,
    width: 70,
  },
  counterGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
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