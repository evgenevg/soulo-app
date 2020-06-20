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
  const [images, setImages] = React.useState(null);

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
        <TextInput
          ref={this.inputRef}
          style={styles.input}
          placeholder={profileData[0].name}
          keyboardAppearance="dark"
          selectionColor="#000000"
          value={message}
          onChangeText={(message) => setMessage(message)}
          onSubmitEditing={() => updateName(message)}
        />
      ) : null}

      {profileData ? (
        <TouchableOpacity onPress={openAlbum}>
          <Image
            source={{ uri: profileData[0].avatar_uri }}
            style={{ height: 100, width: 100 }}
          />
        </TouchableOpacity>
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

  sendButton: {
    fontSize: 17,
    fontFamily: "druk",
  },
  input: {
    fontSize: 20,
    fontFamily: "sharp",
    paddingBottom: 30,
  },
});
