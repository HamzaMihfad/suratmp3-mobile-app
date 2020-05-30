import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SuwarHome from "./components/SuwarHome";
import Home from "./components/Home";
import Player from "./components/Player";
import MiniPlayer from "./components/MiniPlayer";
import { View, Text } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  const [audioStatus, setAudioStatus] = useState(false);
  const [mo9ri2Key, setMo9ri2Key] = useState(0);
  const [suraKey, setSuratKey] = useState(1);

  //MiniPlayer:
  const [inPlayer, setInPlayer] = useState(false);
  const [navigation, setNavigation] = useState(null);
  const [sound, setSound] = useState(null);

  // useEffect(() => {
  //   console.log(audioStatus);
  // });
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={false}>
        <Stack.Screen name="Home">
          {(props) => (
            <Home
              {...props}
              setMo9ri2Key={setMo9ri2Key}
              setNavigation={setNavigation}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="SuwarHome">
          {(props) => <SuwarHome {...props} setSuratKey={setSuratKey} />}
        </Stack.Screen>

        <Stack.Screen name="Player">
          {(props) => (
            <Player
              {...props}
              audioStatus={audioStatus}
              setAudioStatus={setAudioStatus}
              setInPlayer={setInPlayer}
              suraKey={suraKey}
              mo9ri2Key={mo9ri2Key}
              setSuratKey={setSuratKey}
              setSound={setSound}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
      <MiniPlayer
        sound={sound}
        suraKey={suraKey}
        inPlayer={inPlayer}
        mo9ri2Key={mo9ri2Key}
        navigation={navigation}
        audioStatus={audioStatus}
        setAudioStatus={setAudioStatus}
      />
    </NavigationContainer>
  );
}
