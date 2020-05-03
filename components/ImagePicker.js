import * as React from "react";
import {
  Button,
  Image,
  View,
  useState,
  useEffect,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export default function ImagePick({ pickerTriggered, setPickerTriggered }) {
  const [image, setImage] = React.useState(false);

  React.useEffect(() => {
    getPermissionAsync();
  });

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  if (pickerTriggered) {
    _pickImage();
    setPickerTriggered(false);
  }

  return (
    <View style={styles.view}>
      {/* <Button title="Pick an image from camera roll" onPress={_pickImage} /> */}
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    // backgroundColor: "#000",
    width: "100%",
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
});
