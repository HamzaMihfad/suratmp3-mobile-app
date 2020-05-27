import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SuwarHome from "./components/SuwarHome";
import Home from "./components/Home";
import Player from "./components/Player";

const Stack = createStackNavigator();

export default function App() {
  const [audioStatus, setAudioStatus] = useState(false);
  const [mo9ri2Key, setMo9ri2Key] = useState(0);
  const [suraKey, setSuratKey] = useState(0);

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} setMo9ri2Key={setMo9ri2Key} />}
        </Stack.Screen>

        <Stack.Screen name="SuwarHome">
          {(props) => (
            <SuwarHome
              {...props}
              setSuratKey={setSuratKey}
              setAudioStatus={setAudioStatus}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Player">
          {(props) => (
            <Player
              {...props}
              audioStatus={audioStatus}
              setAudioStatus={setAudioStatus}
              suraKey={suraKey}
              mo9ri2Key={mo9ri2Key}
              setSuratKey={setSuratKey}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
