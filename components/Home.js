import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { Al9ora2Array } from "../arrays/Al9ora2Array";
import { useFonts } from "@use-expo/font";

const win = Dimensions.get("window");

export default function Al9ora2({ navigation, setMo9ri2Key }) {
  const [onClick, setOnClick] = useState(null);

  let [fontsLoaded] = useFonts({
    "Arabic-Font": require("../assets/fonts/NotoKufiArabic-Bold.ttf"),
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
        <ScrollView style={{ width: win.width }}>
          {Al9ora2Array.map((mo9ri2, key) => (
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
                setMo9ri2Key(key);
                navigation.navigate("SuwarHome");
              }}
            >
              <Text
                style={[
                  styles.surat,
                  { color: onClick === key ? "#fd7e14" : "#636363" },
                ]}
              >
                {`${Al9ora2Array[key].name}`}
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
    backgroundColor: "#fafafa",
    alignItems: "center",
    paddingTop: win.height * 0.037,
    justifyContent: "center",
  },
  suratContainer: {
    backgroundColor: "#fff",
    width: win.width * 0.9,
    marginVertical: win.width * 0.02,
    marginHorizontal: win.width * 0.05,
    padding: win.height * 0.02,
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
    fontSize: 17,
    color: "#636363",
  },
});
