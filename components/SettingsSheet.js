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
  LayoutAnimation,
  Dimensions,
  AnimatedContainer,
  Title,
  Subtitle,
  Button,
  TextInput,
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import updateName from "../data/UpdateName";
import AvatarPicker from "./AvatarPicker";

import * as SQLite from "expo-sqlite";
import createProfile from "../data/CreateProfile";
const db = SQLite.openDatabase("profile_db");
var moment = require("moment");

const screenHeight = Dimensions.get("window").height;

export default function SettingsSheet({
  opened,
  toggleSettings,
  profileData,
  setProfileData,
  colors,
}) {
  const top = React.useRef(new Animated.Value(screenHeight)).current;
  const [message, setMessage] = React.useState("");
  const [pickerTriggered, setPickerTriggered] = React.useState(false);
  const [profileLoaded, setProfileLoaded] = React.useState(false);

  inputRef = React.createRef();

  fetchProfile = async () => {
    await createProfile();
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
    fetchProfile();
    setProfileLoaded(true);
  }

  toggleSheet = () => {
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
    toggleSettings();
    Keyboard.dismiss();
  };

  if (opened) {
    toggleSheet();
  }

  openAlbum = () => {
    setPickerTriggered(true);
  };

  return (
    <Animated.View
      style={[
        styles.sheet,
        { top: top, backgroundColor: colors.backgroundSecondary },
      ]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={closeSheet}>
          <Text style={[styles.sendButton, { color: colors.textPrimary }]}>
            Back
          </Text>
        </TouchableOpacity>
      </View>

      {profileData ? (
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={openAlbum}>
            <Image
              source={{ uri: profileData[0].avatar_uri }}
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>
      ) : null}

      {profileData ? (
        <View
          style={[
            styles.section,
            { backgroundColor: colors.backgroundPrimary },
          ]}
        >
          <Image
            style={[styles.icon, { tintColor: colors.textPrimary }]}
            source={require("../assets/icons/settings.png")}
          />
          <TextInput
            ref={this.inputRef}
            style={styles.input}
            placeholder={profileData[0].name}
            placeholderTextColor={colors.textPrimary}
            keyboardAppearance="dark"
            selectionColor={colors.textPrimary}
            color={colors.textPrimary}
            value={message}
            onChangeText={(message) => setMessage(message)}
            onSubmitEditing={() => updateName(message)}
          />
        </View>
      ) : null}

      <AvatarPicker
        pickerTriggered={pickerTriggered}
        setPickerTriggered={setPickerTriggered}
      />
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
  },
  topBar: {
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 30,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 27,
  },
  sendButton: {
    fontSize: 17,
    fontFamily: "druk",
  },
  input: {
    fontSize: 30,
    fontFamily: "sharp",
    // paddingBottom: 30,
  },
  section: {
    width: "100%",
    height: 80,
    borderRadius: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 20,
  },
});
