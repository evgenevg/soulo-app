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
} from "react-native";
import { AppLoading } from "expo";

import * as SQLite from "expo-sqlite";
import createProfile from "../data/CreateProfile";
const db = SQLite.openDatabase("profile_db");
var moment = require("moment");

// moment.now().diff(moment(profileData[0].date, "YYYY-MM-DD hh:mm:ss"))

export default function Profile({
  toggleSettings,
  postsNum,
  profileData,
  setProfileData,
  colors,
}) {
  const tabHeight = React.useRef(new Animated.Value(450)).current;
  const avatarSize = React.useRef(new Animated.Value(150)).current;
  const avatarRadius = React.useRef(new Animated.Value(27)).current;
  const nameSize = React.useRef(new Animated.Value(40)).current;
  const [contentFlex, setContentFlex] = React.useState("column");
  const [contentAlign, setContentAlign] = React.useState("center");
  const avatarMargin = React.useRef(new Animated.Value(22)).current;
  const [profileExpanded, setProfileExpanded] = React.useState(true);
  const [settingsDisplayed, setSettingsDisplayed] = React.useState(true);
  const settingsOpacity = React.useRef(new Animated.Value(100)).current;
  const [profileLoaded, setProfileLoaded] = React.useState(false);

  //Making sure the animations will work on Android
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  expandProfile = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(200, "easeInEaseOut", "scaleXY")
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
    setSettingsDisplayed(true);
    Animated.spring(settingsOpacity, {
      toValue: 100,
    }).start();
  };

  condenseProfile = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(150, "easeInEaseOut", "scaleXY")
    );
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
    setSettingsDisplayed(false);
    Animated.spring(settingsOpacity, {
      toValue: 0,
    }).start();
  };

  fetchProfile = async () => {
    createProfile();
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM profile_table", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setProfileData(temp);
      });
    });
  };

  if (!profileLoaded) {
    return (
      <AppLoading
        startAsync={fetchProfile}
        onFinish={() => setProfileLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Animated.View
      style={[
        styles.profile,
        { height: tabHeight, backgroundColor: colors.backgroundPrimary },
      ]}
    >
      {/* {console.log(profileData)} */}
      {settingsDisplayed ? (
        <View>
          <TouchableOpacity onPress={toggleSettings}>
            <Animated.Image
              source={require("../assets/icons/settings.png")}
              style={[styles.settings, { opacity: settingsOpacity }]}
            />
          </TouchableOpacity>
        </View>
      ) : null}
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
            {profileData ? (
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
                source={{ uri: profileData[0].avatar_uri }}
              />
            ) : null}
          </TouchableOpacity>
          {profileData ? (
            <Animated.Text
              style={[
                styles.name,
                { fontSize: nameSize, color: colors.textSecondary },
              ]}
            >
              {profileData[0].name}
            </Animated.Text>
          ) : (
            <Animated.Text style={[styles.name, { fontSize: nameSize }]}>
              Loading...
            </Animated.Text>
          )}
        </Animated.View>
      </Animated.View>
      <View style={styles.counterGroup}>
        <View style={styles.counter}>
          <Text style={[styles.number, { color: colors.textSecondary }]}>
            {postsNum}
          </Text>
          <Text style={[styles.desc, { color: colors.textSecondary }]}>
            Memories
          </Text>
        </View>
        <View style={styles.counter}>
          <Text style={[styles.number, { color: colors.textSecondary }]}>
            310
          </Text>
          <Text style={[styles.desc, { color: colors.textSecondary }]}>
            Days
          </Text>
        </View>
        <View style={styles.counter}>
          <Text style={[styles.number, { color: colors.textSecondary }]}>
            1
          </Text>
          <Text style={[styles.desc, { color: colors.textSecondary }]}>
            Life
          </Text>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  profile: {
    paddingTop: 30,
    paddingHorizontal: 20,
    marginTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    justifyContent: "center",
    width: "100%",
    paddingTop: 20,
    marginBottom: 38,
  },
  settings: {
    height: 30,
    width: 30,
    alignSelf: "flex-end",
  },
  avatar: {
    alignSelf: "center",
  },
  name: {
    alignSelf: "center",
    marginHorizontal: 20,
    fontFamily: "druk",
  },
  counter: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 0,
    width: 120,
  },
  counterGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    width: "100%",
  },
  number: {
    fontSize: 27,
    alignSelf: "center",
    fontFamily: "sharp",
  },
  desc: {
    fontSize: 15,
    alignSelf: "center",
    fontFamily: "sharp",
  },
});
