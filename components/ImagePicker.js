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
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import donwloadFile from "../data/DownloadFile";

export default function ImagePick({
  pickerTriggered,
  setPickerTriggered,
  images,
  setImages,
  heights,
  setHeights,
  widths,
  setWidths,
}) {
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
      });
      if (!result.cancelled) {
        console.log(images);
        var imgs = images.concat(result.uri);
        console.log(images);
        setImages(imgs);

        var hght = heights.concat(result.height);
        console.log(hght);
        setHeights(hght);

        var wdth = widths.concat(result.width);
        console.log(wdth);
        setWidths(wdth);
      }
      // donwloadFile(result.uri, result.height, result.width);
      // readFile("test");
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
  preview: {
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
