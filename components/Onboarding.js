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
  TextInput,
} from "react-native";

import updateName from "../data/UpdateName";
import AvatarPicker from "./AvatarPicker";

export default function Onboarding({ colors }) {
  const [message, setMessage] = React.useState("");
  const [image, setImage] = React.useState("");
  const [pickerTriggered, setPickerTriggered] = React.useState(false);

  inputRef = React.createRef();

  openAlbum = () => {
    setPickerTriggered(true);
  };

  return (
    <View
      style={[
        styles.view,
        {
          backgroundColor: colors.backgroundPrimary,
        },
      ]}
    >
      {/* Should be close onboarding. Needs to be animated transtioion into the main feed */}
      <TouchableOpacity style={{ width: "90%" }}>
        <Text
          style={[
            styles.header,
            { fontFamily: "druk", color: colors.textPrimary },
          ]}
        >
          The journey begins...
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openAlbum} style={styles.avatar}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image
            source={require("../assets/avatar.jpg")}
            style={styles.image}
          />
        )}
      </TouchableOpacity>
      <TextInput
        ref={this.inputRef}
        style={styles.input}
        placeholder={"Enter your name"}
        placeholderTextColor={colors.textPrimary}
        keyboardAppearance="dark"
        selectionColor={colors.textPrimary}
        color={colors.textPrimary}
        value={message}
        onChangeText={(message) => setMessage(message)}
        onSubmitEditing={() => updateName(message)}
      />

      <TouchableOpacity style={{ width: "85%", height: 50 }}>
        <View
          style={[styles.button, { backgroundColor: colors.textSecondary }]}
        >
          <Text
            style={[
              styles.buttonText,
              { fontFamily: "druk", color: colors.backgroundPrimary },
            ]}
          >
            Let's go
          </Text>
        </View>
      </TouchableOpacity>
      <AvatarPicker
        pickerTriggered={pickerTriggered}
        setPickerTriggered={setPickerTriggered}
        setImage={setImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  avatar: {
    paddingBottom: 30,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  input: {
    fontSize: 20,
    paddingBottom: 120,
    fontFamily: "druk",
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 50,
  },
  button: {
    height: 50,
    width: "100%",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});
