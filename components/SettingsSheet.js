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

const screenHeight = Dimensions.get("window").height;

export default function SettingsSheet({ opened, toggleSettings }) {
  const top = React.useRef(new Animated.Value(screenHeight)).current;

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
    toggleSettings();
    Keyboard.dismiss();
  };

  if (opened) {
    toggleSheet();
  }

  return (
    <Animated.View style={[styles.sheet, { top: top }]}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={closeSheet}>
          <Text style={styles.sendButton}>Back</Text>
        </TouchableOpacity>
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

  sendButton: {
    fontSize: 17,
    fontFamily: "druk",
  },
});
