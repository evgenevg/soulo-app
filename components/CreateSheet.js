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
}) {
  const top = React.useRef(new Animated.Value(screenHeight)).current;
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
    Animated.spring(top, {
      toValue: 60,
      speed: 6,
      bounciness: 2,
    }).start();
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

  if (opened) {
    toggleSheet();
  }

  openAlbum = () => {
    setPickerTriggered(true);
  };

  openSearch = (type) => {
    setSearchType(type);
    setSearchOpened(true);
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
    } else {
      setSettingsOpened(true);
    }
  };

  return (
    <Animated.View style={[styles.sheet, { top: top }]}>
      {searchOpened ? (
        <Search
          opened={searchOpened}
          toggleSearch={toggleSearch}
          setBook={setBook}
          setAlbum={setAlbum}
          searchType={searchType}
        />
      ) : null}
      <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={closeSheet}>
            <Text style={styles.sendButton}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={sendPost}>
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
        {/* Preview of the payload, will be removed later */}
        <Text>{book}</Text>
        <Text>{album}</Text>
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
      </View>
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
