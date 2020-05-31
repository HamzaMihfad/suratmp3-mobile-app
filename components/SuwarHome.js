import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "@use-expo/font";
import { suwar } from "../arrays/Suwar";

const win = Dimensions.get("window");

export default function SuwarHome({
  navigation,
  setSuratKey,
  mo9ri2,
  setDisplayMiniPlayer,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [onClick, setOnClick] = useState(null);
  const [searchField, setSearchField] = useState("");

  let [fontsLoaded] = useFonts({
    "Arabic-Font": require("../assets/fonts/NotoKufiArabic-Bold.ttf"),
  });

  const filteredSuwar = suwar.filter((surah) => {
    return surah.includes(searchField);
  });

  useEffect(() => {
    setIsLoading(false);
  });

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#22aaf5" />}

      {!isLoading && (
        <View>
          <View style={styles.mo9ri2Header}>
            <View style={{ width: win.width * 0.92 }}>
              <Text
                style={{
                  fontFamily: "Arabic-Font",
                  fontSize: 21,
                  color: "white",
                }}
              >
                {mo9ri2.name}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.dropDown}>
                <FontAwesome5 name="sort-down" size={26} color="#fd7e14" />
              </View>
              <View
                style={[
                  styles.dropDown,
                  {
                    backgroundColor: "#111111bb",
                    alignItems: "center",
                    justifyContent: "space-around",
                  },
                ]}
              >
                <FontAwesome5 name="search" size={21} color="white" />
                <TextInput
                  style={{ color: "white" }}
                  placeholder="ابحث عن سورة ..."
                  placeholderTextColor="#ccc"
                  onChangeText={(val) => {
                    setSearchField(val);
                    val
                      ? setDisplayMiniPlayer(false)
                      : setDisplayMiniPlayer(true);
                  }}
                />
              </View>
            </View>
          </View>
          <ScrollView style={{ width: win.width }}>
            {filteredSuwar.map((sura, key) => {
              return (
                <TouchableHighlight
                  key={key}
                  style={styles.suratContainer}
                  underlayColor="#fff"
                  onShowUnderlay={() => {
                    setOnClick(key);
                  }}
                  onHideUnderlay={() => {
                    setOnClick(null);
                  }}
                  onPress={() => {
                    setSuratKey(key + 1);
                    navigation.navigate("Player");
                  }}
                >
                  <Text
                    style={[
                      styles.surat,
                      { color: onClick === key ? "#fd7e14" : "#636363" },
                    ]}
                  >
                    {key + 1}. {`سورة ${sura}`}
                  </Text>
                </TouchableHighlight>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "right",
    width: win.width,
  },
  suratContainer: {
    backgroundColor: "#fff",
    width: win.width * 0.92,
    marginVertical: win.height * 0.008,
    marginHorizontal: win.width * 0.04,
    paddingHorizontal: win.width * 0.08,
    paddingVertical: win.height * 0.01,
    shadowColor: "#000",
    borderWidth: 2,
    borderColor: "#d6d8ea",
    borderRadius: 10,
    overflow: "hidden",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 2,
  },
  surat: {
    fontFamily: "Arabic-Font",
    fontSize: 15,
    color: "#636363",
  },
  align: {
    width: win.width * 0.6,
  },
  mo9ri2Header: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: win.width * 0.02,
    paddingTop: win.height * 0.045,
    marginBottom: win.height * 0.007,
    width: win.width,
    height: win.height * 0.19,
    backgroundColor: "#22aaf5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  dropDown: {
    flexDirection: "row",
    margin: win.height * 0.012,
    backgroundColor: "#ffffffdd",
    width: win.width * 0.45,
    height: win.height * 0.055,
    borderRadius: 100,
    paddingHorizontal: win.width * 0.01,
  },
});
