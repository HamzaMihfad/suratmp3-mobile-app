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
import { arr } from "../arrays/Arr";
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
    return surah.name.includes(searchField);
  });

  const getRiwaya = (riwaya) => {
    switch (riwaya) {
      case "hafs":
        return "رواية حفص عن عاصم";
      case "warsh":
        return "رواية ورش عن نافع";
      case "kalon":
        return "رواية قالون عن نافع";
      case "sousi":
        return "السوسي عن أبي عمرو";
      case "khalaf":
        return "رواية خلف عن حمزة";
      case "rwisroh":
        return "رويس و روح";
      case "dawrikisa2i":
        return "الدوري عن الكسائي";
      case "bzri9onbol":
        return "البزي وقنبل عن ابن كثير";
      default:
        return "";
    }
  };

  useEffect(() => {
    setIsLoading(false);
  });

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator size="large" color="#22aaf5" />}

      {!isLoading && (
        <View>
          <View style={styles.Header}>
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
              <View
                style={[
                  styles.dropDown,
                  {
                    alignItems: "center",
                    justifyContent: "space-around",
                  },
                ]}
              >
                <FontAwesome5
                  style={{ top: -4 }}
                  name="sort-down"
                  size={26}
                  color="#fd7e14"
                />
                <Text
                  style={{
                    fontFamily: "Arabic-Font",
                    fontSize: 13,
                    color: "#333",
                  }}
                >
                  {getRiwaya(mo9ri2.riwayat[0])}
                </Text>
              </View>

              {/* Searsh Container */}
              <View
                style={[
                  styles.dropDown,
                  {
                    width: win.width * 0.42,
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
                    setSuratKey(sura.id);
                    navigation.navigate("Player");
                  }}
                >
                  <Text
                    style={[
                      styles.surat,
                      { color: onClick === key ? "#fd7e14" : "#373737" },
                    ]}
                  >
                    {sura.id}. {`سورة ${sura.name}`}
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
  },
  align: {
    width: win.width * 0.6,
  },
  Header: {
    // flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: win.width * 0.02,
    paddingTop: win.height * 0.045,
    marginBottom: win.height * 0.007,
    width: win.width,
    height: win.height * 0.19,
    backgroundColor: "#22aaf5",
    borderBottomWidth: 2,
    borderColor: "#fd7e14",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 2,
  },
  dropDown: {
    flexDirection: "row",
    margin: win.height * 0.012,
    backgroundColor: "#ffffffdd",
    width: win.width * 0.5,
    height: win.height * 0.055,
    borderRadius: 100,
  },
});
