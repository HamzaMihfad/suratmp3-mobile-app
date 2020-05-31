import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Slider,
} from "react-native";
import Moment from "moment";
import { useFonts } from "@use-expo/font";
import { FontAwesome5 } from "@expo/vector-icons";
import AudioPlayer from "./audioPlayer/AudioPlayer";
import { suwar } from "../arrays/Suwar";
import { Notifications } from "expo";

const win = Dimensions.get("window");

export default function Player({
  audioStatus,
  setAudioStatus,
  setInPlayer,
  suraKey,
  mo9ri2,
  setSuratKey,
  setSound,
  currentRiwaya,
}) {
  const [audioLength, setAudioLength] = useState(0);
  const [timer, setTimer] = useState(0);
  const [setPosition, setSetPosition] = useState(0);
  const [shouldUpdate, setShouldUpdate] = useState(0);
  const [link, setLink] = useState("");

  // arabic font:
  let [fontsLoaded] = useFonts({
    "Arabic-Font": require("../assets/fonts/NotoKufiArabic-Bold.ttf"),
  });

  // notification:
  const notification = () => {
    Notifications.createCategoryAsync("daily", [
      // {
      //   actionId: "yes",
      //   buttonTitle: "السابق",
      // },
      {
        actionId: "no",
        buttonTitle: "إيقاف",
      },
      // {
      //   actionId: "yes",
      //   buttonTitle: "التالي",
      // },
    ]);
    Notifications.presentLocalNotificationAsync({
      title: `سورة ${suwar[suraKey - 1].name}`,
      body: `القارئ : ${mo9ri2.name}`,
      categoryId: "daily",
    });
  };

  // to change the audio url:
  const getLink = (condition, key) => {
    if (key === 0) {
      setLink(`${mo9ri2.path}${mo9ri2.riwayat[currentRiwaya]}/114.mp3`);
      setSuratKey(114);
    } else if (key === 115) {
      setLink(`${mo9ri2.path}${mo9ri2.riwayat[currentRiwaya]}/001.mp3`);
      setSuratKey(1);
    } else if (key < 10) {
      setLink(`${mo9ri2.path}${mo9ri2.riwayat[currentRiwaya]}/00${key}.mp3`);
      console.log(link);
    } else if (key < 100)
      setLink(`${mo9ri2.path}${mo9ri2.riwayat[currentRiwaya]}/0${key}.mp3`);
    else setLink(`${mo9ri2.path}${mo9ri2.riwayat[currentRiwaya]}/${key}.mp3`);
    if (key !== 0 && key != 115) setSuratKey(key);
    if (condition) setShouldUpdate(2);
  };

  useEffect(() => {
    getLink(0, suraKey);
    setInPlayer(true);
    //notification();
    return () => {
      setInPlayer(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      {link ? (
        <AudioPlayer
          audioLink={link}
          audioStatus={audioStatus}
          setAudioStatus={setAudioStatus}
          setTimer={setTimer}
          setAudioLength={setAudioLength}
          setPosition={setPosition}
          shouldUpdate={shouldUpdate}
          setShouldUpdate={setShouldUpdate}
          setSound={setSound}
        ></AudioPlayer>
      ) : null}
      <Image
        source={require("../assets/player-image.png")}
        style={styles.playerImage}
      ></Image>

      <Text
        style={{
          fontSize: 22,
          marginTop: win.height * 0.07,
          color: "#323232",
          fontFamily: "Arabic-Font",
        }}
      >{`${suraKey}. سورة ${suwar[suraKey - 1].name}`}</Text>
      <Text
        style={{
          fontSize: 13,
          marginTop: 8,
          color: "#8F98A7",
          fontFamily: "Arabic-Font",
        }}
      >
        {mo9ri2.name}
      </Text>

      <View style={styles.player}>
        <View style={{ width: win.width }}>
          <Slider
            minimumValue={0}
            maximumValue={audioLength}
            minimumTrackTintColor="#22aaf5"
            maximumTrackTintColor="#fd7e14"
            thumbTintColor="#8F98A7"
            value={timer}
            onValueChange={(seconds) => {
              //setTimer(seconds);
              setSetPosition(seconds / 1000);
              setShouldUpdate(1);
            }}
          ></Slider>
          <View
            style={{
              marginHorizontal: win.width * 0.04,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "#fd7e14", fontSize: 11 }}>
              {Moment.utc(timer).format("m:ss")}
            </Text>
            <Text style={{ color: "#fd7e14", fontSize: 11 }}>
              {Moment.utc(audioLength).format("m:ss")}
            </Text>
          </View>
        </View>

        <View style={styles.controlButtons}>
          <TouchableOpacity
            onPress={() => {
              getLink(1, suraKey - 1);
            }}
          >
            <FontAwesome5 name="fast-backward" size={33} color="#22aaf5" />
          </TouchableOpacity>
          {audioStatus ? (
            <TouchableOpacity
              onPress={() => {
                setAudioStatus(false);
              }}
            >
              <FontAwesome5 name="pause" size={33} color="#fd7e14" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setAudioStatus(true);
              }}
            >
              <FontAwesome5 name="play" size={33} color="#fd7e14" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              getLink(1, suraKey + 1);
            }}
          >
            <FontAwesome5 name="fast-forward" size={33} color="#22aaf5" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
  },
  playerImage: {
    width: win.width * 0.6,
    height: win.width * 0.6,
    marginTop: win.height * 0.15,
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: win.height * 0.07,
    width: win.width,
  },
  player: {
    position: "absolute",
    bottom: win.height * 0.1,
  },
});
