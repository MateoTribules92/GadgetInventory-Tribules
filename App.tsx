import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StackNavigator } from "./src/navigation/StackNavigator";
import { getDatabase } from "./src/database/database";

const App = () => {
  useEffect(() => {
    getDatabase()
      .then(() => console.log("Base de datos lista"))
      .catch((error) => console.error("Error inicializando DB", error));
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <StackNavigator />
    </NavigationContainer>
  );
};

export default App;
