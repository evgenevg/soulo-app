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
} from "react-native";

export default function CreateButton({ toggleCreateSheet }) {
  const buttonSize = React.useRef(new Animated.Value(70)).current;
  const buttonBorder = React.useRef(new Animated.Value(13)).current;

  buttonTouch = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(10, "easeInEaseOut", "scaleXY")
    );
    Animated.spring(buttonSize, {
      toValue: 65,
    }).start();
    Animated.spring(buttonBorder, {
      toValue: 11.5,
    }).start();
  };

  buttonRelease = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(10, "easeInEaseOut", "scaleXY")
    );
    Animated.spring(buttonSize, {
      toValue: 70,
    }).start();
    Animated.spring(buttonBorder, {
      toValue: 13,
    }).start();
    toggleCreateSheet();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.opacity}
        activeOpacity={1}
        onPressIn={() => {
          buttonTouch();
        }}
        onPressOut={() => buttonRelease()}
      >
        <Animated.View
          style={[
            styles.create,
            {
              height: buttonSize,
              width: buttonSize,
              borderWidth: buttonBorder,
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  opacity: {
    paddingBottom: 70,
  },
  create: {
    borderRadius: 35,
    borderColor: "#000000",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
