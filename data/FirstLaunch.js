import { AsyncStorage } from "react-native";
import createProfile from "./CreateProfile";

const HAS_LAUNCHED = "hasLaunched";

function setAppLaunched() {
  AsyncStorage.setItem(HAS_LAUNCHED, "true");
}

export default async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    createProfile();
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
