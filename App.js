import * as React from "react";
import { Button, View, Text, Alert } from "react-native";
import Navigation from "./components/Navigation";
import Onboarding from "./components/Onboarding";
import checkIfFirstLaunch from "./data/FirstLaunch";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";

import Intro from "./components/Intro.js";

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);
  const [hasCheckedAsyncStorage, setHasCheckedAsyncStorage] = React.useState(
    false
  );

  const fetchData = async () => {
    const launch = await checkIfFirstLaunch();

    setIsFirstLaunch(launch);
    setHasCheckedAsyncStorage(true);
    console.log("fetch triggered");
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (!hasCheckedAsyncStorage) {
    return (
      <View>
        <Text>Hey!</Text>
      </View>
    );
  }

  if (isFirstLaunch) {
    return <Onboarding fetchData={fetchData} />;
  } else {
    // return <Navigation />;
    return <Intro />;
  }
}

export default App;
