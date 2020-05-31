import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Al9ora2Array } from "../arrays/Al9ora2Array";
import { useFonts } from "@use-expo/font";

const win = Dimensions.get("window");

export default function Al9ora2({
  navigation,
  setMo9ri2Key,
  setNavigation,
  setDisplayMiniPlayer,
}) {
  const [onClick, setOnClick] = useState(null);
  const [searchField, setSearchField] = useState("");

  let [fontsLoaded] = useFonts({
    "Arabic-Font": require("../assets/fonts/NotoKufiArabic-Bold.ttf"),
  });

  const filtered9ora2 = Al9ora2Array.filter((mo9ri2) => {
    return mo9ri2.name.includes(searchField);
  });

  useEffect(() => {
    setNavigation(navigation);
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#22aaf5" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
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
              placeholder="ابحث عن قارئ ..."
              placeholderTextColor="#ccc"
              onChangeText={(val) => {
                setSearchField(val);
                val ? setDisplayMiniPlayer(false) : setDisplayMiniPlayer(true);
              }}
            />
          </View>
          <Text
            style={{
              fontFamily: "Arabic-Font",
              fontSize: 25,
              color: "white",
            }}
          >
            القراء
          </Text>
        </View>

        <ScrollView style={{ width: win.width }}>
          {filtered9ora2.map((mo9ri2, key) => (
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
                setOnClick(key);
                setMo9ri2Key(mo9ri2.id);
                navigation.navigate("SuwarHome");
              }}
            >
              <Text
                style={[
                  styles.surat,
                  { color: onClick === key ? "#fd7e14" : "#373737" },
                ]}
              >
                {`${mo9ri2.name}`}
              </Text>
            </TouchableHighlight>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: win.height,
    backgroundColor: "#fafafa",
    alignItems: "center",
    paddingTop: win.height * 0.037,
    justifyContent: "center",
  },
  suratContainer: {
    backgroundColor: "#fff",
    width: win.width * 0.9,
    marginVertical: win.height * 0.007,
    marginHorizontal: win.width * 0.05,
    padding: win.height * 0.012,
    borderWidth: 2,
    borderColor: "#22aaf5",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
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
  Header: {
    paddingLeft: win.width * 0.02,
    paddingRight: win.width * 0.05,
    paddingTop: win.height * 0.01,
    marginBottom: win.height * 0.007,
    width: win.width,
    height: win.height * 0.095,
    backgroundColor: "#22aaf5",
    borderBottomWidth: 2,
    borderColor: "#fd7e14",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: win.width * 0.45,
    height: win.height * 0.055,
    borderRadius: 100,
  },
});
