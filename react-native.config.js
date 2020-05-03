module.exports = {
  // config for a library is scoped under "dependency" key
  dependency: {
    platforms: {
      ios: {
        "@react-native-community/async-storage": "^1.9.0",
        "@react-native-community/cameraroll": "^1.6.0",
        expo: "~36.0.0",
        "expo-file-system": "~8.0.0",
        "expo-font": "~8.0.0",
        react: "^16.9.0",
        "react-dom": "^16.9.0",
        "react-native":
          "https://github.com/expo/react-native/archive/sdk-36.0.0.tar.gz",
        "react-native-cli": "^2.0.1",
        "react-native-fit-image": "^1.5.5",
        "react-native-style-tachyons": "^4.0.0",
        "react-native-web": "~0.11.7",
      },
      android: {
        "@react-native-community/async-storage": "^1.9.0",
        "@react-native-community/cameraroll": "^1.6.0",
        expo: "~36.0.0",
        "expo-file-system": "~8.0.0",
        "expo-font": "~8.0.0",
        react: "^16.9.0",
        "react-dom": "^16.9.0",
        "react-native":
          "https://github.com/expo/react-native/archive/sdk-36.0.0.tar.gz",
        "react-native-cli": "^2.0.1",
        "react-native-fit-image": "^1.5.5",
        "react-native-style-tachyons": "^4.0.0",
        "react-native-web": "~0.11.7",
      }, // projects are grouped into "platforms"
    },
    assets: "./assets/fonts/", // stays the same
    // hooks are considered anti-pattern, please avoid them
    hooks: {
      prelink: "./path-to-a-prelink-hook",
    },
  },
};
