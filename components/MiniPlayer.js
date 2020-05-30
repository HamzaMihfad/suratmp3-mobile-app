import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { useFonts } from "@use-expo/font";
import { suwar } from "../arrays/Suwar";
import { FontAwesome5 } from "@expo/vector-icons";
import { Al9ora2Array } from "../arrays/Al9ora2Array";

const win = Dimensions.get("window");

export default function SuwarHome({
  sound,
  suraKey,
  inPlayer,
  mo9ri2Key,
  navigation,
  audioStatus,
  setAudioStatus,
}) {
  let [fontsLoaded] = useFonts({
    "Arabic-Font": require("../assets/fonts/NotoKufiArabic-Bold.ttf"),
  });

  async function pauseAudio() {
    await sound.pauseAsync();
    setAudioStatus(false);
  }

  async function playAudio() {
    await sound.playAsync();
    setAudioStatus(true);
  }

  if (!fontsLoaded || inPlayer) {
    return null;
  } else {
    return (
      <TouchableWithoutFeedback
        style={{ width: win.width, alignItems: "center" }}
        onPress={() => {
          navigation.navigate("Player");
        }}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              getLink(1, suraKey - 1);
            }}
          >
            <FontAwesome5 name="fast-backward" size={25} color="#22aaf5" />
          </TouchableOpacity>
          {audioStatus ? (
            <TouchableOpacity
              onPress={() => {
                pauseAudio();
              }}
            >
              <FontAwesome5 name="pause" size={25} color="#fd7e14" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                playAudio();
              }}
            >
              <FontAwesome5 name="play" size={25} color="#fd7e14" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              getLink(1, suraKey + 1);
            }}
          >
            <FontAwesome5 name="fast-forward" size={25} color="#22aaf5" />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 14,
                color: "#323232",
                fontFamily: "Arabic-Font",
              }}
            >
              {`${suraKey}. سورة ${suwar[suraKey - 1]}`}
            </Text>
            <Text
              style={{
                margin: 0,
                padding: 0,
                fontSize: 12,
                color: "#8F98A7",
                fontFamily: "Arabic-Font",
              }}
            >
              {Al9ora2Array[mo9ri2Key].name}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 0.1 * win.height,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#22aaf5",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 25,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
});
