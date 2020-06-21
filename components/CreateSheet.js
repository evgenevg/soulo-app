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
import readFile from "../data/DownloadFile";
import createPost from "../data/CreatePost";
import Search from "./Search";

const screenHeight = Dimensions.get("window").height;

export default function CreateSheet({
  opened,
  toggleCreateSheet,
  setFetchData,
  colors,
  hideHome,
  showHome,
}) {
  const top = React.useRef(new Animated.Value(screenHeight)).current;
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;
  const [message, setMessage] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [heights, setHeights] = React.useState([]);
  const [widths, setWidths] = React.useState([]);
  const [pickerTriggered, setPickerTriggered] = React.useState(false);
  const [postSent, setPostSent] = React.useState(false);
  const [searchOpened, setSearchOpened] = React.useState(false);
  const [book, setBook] = React.useState([]);
  const [album, setAlbum] = React.useState([]);
  const [searchType, setSearchType] = React.useState("book");

  inputRef = React.createRef();

  focusInputWithKeyboard = () => {
    InteractionManager.runAfterInteractions(() => {
      this.inputRef.current.focus();
    });
  };

  toggleSheet = () => {
    // this.focusInputWithKeyboard();
    if (!searchOpened) {
      Animated.spring(top, {
        toValue: 60,
        speed: 6,
        bounciness: 2,
      }).start();
    }
  };

  closeSheet = () => {
    Animated.spring(top, {
      toValue: screenHeight,
      speed: 6,
      bounciness: 2,
    }).start();
    toggleCreateSheet();
    Keyboard.dismiss();
  };

  collapseSheet = () => {
    // Triggered when search is opened and the sheet is moved to the background
    hideHome();
    Animated.timing(scale, {
      toValue: 0.9,
      duration: 300,
      easing: Easing.in(),
    }).start();
    Animated.spring(top, {
      toValue: 0,
      speed: 6,
      bounciness: 0,
    }).start();
    Animated.timing(opacity, {
      toValue: 0.5,
      duration: 400,
    }).start();
  };

  expandSheet = () => {
    // Triggered when search is closed and the sheet is moved to the foreground
    showHome();
    Animated.timing(scale, {
      toValue: 1,
      duration: 300,
      easing: Easing.in(),
    }).start();
    Animated.spring(top, {
      toValue: 60,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 100,
    }).start();
  };

  if (opened) {
    toggleSheet();
  }

  openAlbum = () => {
    setPickerTriggered(true);
  };

  openSearch = (type) => {
    setSearchType(type);
    setSearchOpened(true);
    collapseSheet();
  };

  sendPost = async () => {
    if (message || images.length > 0 || book || album) {
      await createPost(message, images, heights, widths, book, album);
      console.log(
        "Sending the following payload to the function: " +
          [message, images, heights, widths, book, album]
      );
    }
    toggleCreateSheet();
    setTimeout(() => {
      setFetchData({ timePassed: true });
    }, 250);
  };

  toggleSearch = () => {
    if (searchOpened) {
      setSearchOpened(false);
      expandSheet();
    } else {
      setSearchOpened(true);
    }
  };

  removeImage = (index) => {
    if (images.length > 1) {
      setImages(images.splice(index, index + 1));
      setHeights(heights.splice(index, index + 1));
      setWidths(widths.splice(index, index + 1));
    } else {
      setImages([]);
      setHeights([]);
      setWidths([]);
    }
  };

  return (
    <View style={styles.main}>
      {searchOpened ? (
        <Search
          opened={searchOpened}
          toggleSearch={toggleSearch}
          setBook={setBook}
          setAlbum={setAlbum}
          searchType={searchType}
          colors={colors}
        />
      ) : null}
      <Animated.View
        style={[
          styles.sheet,
          {
            top: top,
            backgroundColor: colors.backgroundSecondary,
            transform: [{ scale: scale }],
            opacity: opacity,
          },
        ]}
      >
        <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={closeSheet}>
              <Text style={[styles.sendButton, { color: colors.textPrimary }]}>
                Back
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendPost}>
              <Text style={[styles.sendButton, { color: colors.textPrimary }]}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            ref={this.inputRef}
            style={styles.input}
            placeholder="What's on your mind?"
            placeholderTextColor={colors.textSecondary}
            keyboardAppearance="dark"
            selectionColor={colors.textPrimary}
            color={colors.textPrimary}
            autoFocus={true}
            value={message}
            onChangeText={(message) => setMessage(message)}
          />
          <View style={styles.actionBar}>
            <View style={[styles.placeholder]}>
              <TouchableOpacity onPress={openAlbum}>
                <Image
                  source={require("../assets/icons/album.png")}
                  style={styles.contentIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.placeholder]}>
              <TouchableOpacity onPress={() => openSearch("book")}>
                <Image
                  source={require("../assets/icons/book.png")}
                  style={styles.contentIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.placeholder]}>
              <TouchableOpacity onPress={() => openSearch("album")}>
                <Image
                  source={require("../assets/icons/music.png")}
                  style={styles.contentIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ImagePick
            pickerTriggered={pickerTriggered}
            setPickerTriggered={setPickerTriggered}
            images={images}
            heights={heights}
            widths={widths}
            setImages={setImages}
            setHeights={setHeights}
            setWidths={setWidths}
          />
          <ScrollView
            style={styles.preview}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {images &&
              images.map((x, i) => (
                <View>
                  <TouchableOpacity
                    onPress={() => removeImage(i)}
                    key={x}
                    style={styles.remove}
                  >
                    <Image
                      source={require("../assets/icons/cancel.png")}
                      style={[
                        { tintColor: colors.textPrimary },
                        styles.cancelButton,
                      ]}
                    />
                  </TouchableOpacity>
                  <Image source={{ uri: x }} style={styles.image} />
                </View>
              ))}
            {book[0] && (
              <View>
                <TouchableOpacity
                  onPress={() => setBook([])}
                  style={styles.remove}
                >
                  <Image
                    source={require("../assets/icons/cancel.png")}
                    style={[
                      { tintColor: colors.textPrimary },
                      styles.cancelButton,
                    ]}
                  />
                </TouchableOpacity>
                <Image source={{ uri: book[2] }} style={styles.image} />
              </View>
            )}
            {album[0] && (
              <View>
                <TouchableOpacity
                  onPress={() => setAlbum([])}
                  style={styles.remove}
                >
                  <Image
                    source={require("../assets/icons/cancel.png")}
                    style={[
                      { tintColor: colors.textPrimary },
                      styles.cancelButton,
                    ]}
                  />
                </TouchableOpacity>
                <Image source={{ uri: album[2] }} style={styles.image} />
              </View>
            )}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    position: "absolute",
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheet: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
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
  remove: {
    position: "absolute",
    top: -3,
    right: 5,
    zIndex: 1,
  },
  cancelButton: {
    height: 28,
    width: 28,
  },
});
