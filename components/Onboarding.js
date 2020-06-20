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

export default function Onboarding() {
  const [message, setMessage] = React.useState("");
  const [pickerTriggered, setPickerTriggered] = React.useState(false);

  inputRef = React.createRef();

  openAlbum = () => {
    setPickerTriggered(true);
  };

  return (
    <View style={{ marginTop: 150 }}>
      <Text>This is Onboarding</Text>
      <TextInput
        ref={this.inputRef}
        style={styles.input}
        placeholder={"Enter your name"}
        keyboardAppearance="dark"
        selectionColor="#000000"
        value={message}
        onChangeText={(message) => setMessage(message)}
        onSubmitEditing={() => updateName(message)}
      />

      <TouchableOpacity onPress={openAlbum}>
        <Image
          source={require("../assets/icons/album.png")}
          style={{ height: 100, width: 100 }}
        />
      </TouchableOpacity>

      <AvatarPicker
        pickerTriggered={pickerTriggered}
        setPickerTriggered={setPickerTriggered}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    paddingBottom: 30,
  },
});
