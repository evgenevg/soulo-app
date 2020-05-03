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

import ImagePick from "./ImagePicker";

const screenHeight = Dimensions.get("window").height;

export default function CreateSheet({ opened, toggleCreateSheet }) {
  const top = React.useRef(new Animated.Value(screenHeight)).current;
  const [message, setMessage] = React.useState("");
  const [pickerTriggered, setPickerTriggered] = React.useState(false);

  inputRef = React.createRef();

  focusInputWithKeyboard = () => {
    InteractionManager.runAfterInteractions(() => {
      this.inputRef.current.focus();
    });
  };

  toggleSheet = () => {
    // this.focusInputWithKeyboard();
    Animated.spring(top, {
      toValue: 100,
    }).start();
  };

  closeSheet = () => {
    Animated.spring(top, {
      toValue: screenHeight,
    }).start();
    toggleCreateSheet();
    Keyboard.dismiss();
  };

  if (opened) {
    toggleSheet();
  }

  openAlbum = () => {
    setPickerTriggered(true);
  };

  return (
    <Animated.View style={[styles.sheet, { top: top }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={closeSheet}>
          <Text style={styles.sendButton}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeSheet}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        ref={this.inputRef}
        style={styles.input}
        placeholder="What's on your mind?"
        keyboardAppearance="dark"
        selectionColor="#000000"
        autoFocus={true}
        value={message}
        onChangeText={(message) => setMessage(message)}
      />
      <View style={styles.actionBar}>
        {/* <View style={[styles.placeholder]}>
          <Image
            source={require("../assets/icons/camera.png")}
            style={styles.contentIcon}
          />
        </View> */}
        <View style={[styles.placeholder]}>
          <TouchableOpacity onPress={openAlbum}>
            <Image
              source={require("../assets/icons/album.png")}
              style={styles.contentIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.placeholder]}>
          <Image
            source={require("../assets/icons/book.png")}
            style={styles.contentIcon}
          />
        </View>
        <View style={[styles.placeholder]}>
          <Image
            source={require("../assets/icons/music.png")}
            style={styles.contentIcon}
          />
        </View>
      </View>
      <ImagePick
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
    backgroundColor: "#f0f3f5",
  },
  topBar: {
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    fontSize: 20,
    fontFamily: "sharp",
    paddingBottom: 30,
  },
  actionBar: {
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    paddingBottom: 20,
  },
  contentIcon: {
    width: 80,
    height: 80,
  },
  sendButton: {
    fontSize: 17,
    fontFamily: "druk",
  },
  placeholder: {
    marginRight: 15,
    height: 80,
    width: 80,
    backgroundColor: "#E8E8E8",
    borderRadius: 9,
  },
});