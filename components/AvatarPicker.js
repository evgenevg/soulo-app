import * as React from "react";
import {
  Button,
  Image,
  View,
  useState,
  useEffect,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as FileSystem from "expo-file-system";
const { v4: uuidv4 } = require("uuid");

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import donwloadFile from "../data/DownloadFile";
import updateAvatar from "../data/UpdateAvatar";

export default function AvatarPicker({ pickerTriggered, setPickerTriggered }) {
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async () => {
    getPermissionAsync();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        quality: 1,
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!result.cancelled) {
        const fileUri = FileSystem.documentDirectory + uuidv4();
        let downloadObject = FileSystem.createDownloadResumable(
          result.uri,
          fileUri
        );
        let response = await downloadObject.downloadAsync();
        await updateAvatar(response.uri, 500, 500);
      }
    } catch (E) {
      console.log(E);
    }
  };

  if (pickerTriggered) {
    _pickImage();
    setPickerTriggered(false);
  }

  return <View></View>;
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    flexDirection: "row",
    alignContent: "flex-start",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 12,
    marginRight: 15,
  },
});
