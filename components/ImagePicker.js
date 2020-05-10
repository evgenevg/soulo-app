import * as React from "react";
import {
  Button,
  Image,
  View,
  useState,
  useEffect,
  StyleSheet,
  TouchableOpacity,
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
  const [image, setImage] = React.useState(false);
  const [result, setResult] = React.useState(false);

  // For testing purposes, removed this call on component did load. The permission should be triggered when the album function is called
  // React.useEffect(() => {
  //   getPermissionAsync();
  // });

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
        setImage(result.uri);

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

  return (
    <View style={styles.view}>
      <TouchableOpacity>
        {/* <Button title="Pick an image from camera roll" onPress={_pickImage} /> */}
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </TouchableOpacity>
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
