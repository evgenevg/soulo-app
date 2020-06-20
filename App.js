import * as React from "react";
import { Button, View, Text } from "react-native";
import Navigation from "./components/Navigation";
import Onboarding from "./components/Onboarding";
import checkIfFirstLaunch from "./data/FirstLaunch";

function App() {
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(false);
  const [hasCheckedAsyncStorage, setHasCheckedAsyncStorage] = React.useState(
    false
  );

  React.useEffect(() => {
    const fetchData = async () => {
      const launch = await checkIfFirstLaunch();

      setIsFirstLaunch(launch);
      setHasCheckedAsyncStorage(true);
    };

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
    return <Onboarding />;
  } else {
    return <Navigation />;
  }
}

export default App;
