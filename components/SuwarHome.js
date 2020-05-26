import React from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useFonts } from '@use-expo/font';
import { suwar } from '../arrays/Suwar';

const win = Dimensions.get('window');

export default function SuwarHome({ navigation, setSuratKey, setAudioStatus }) {

    let [fontsLoaded] = useFonts({
        'Arabic-Font': require('../assets/fonts/NotoKufiArabic-Bold.ttf'),
    });

    return (

        <View style={styles.container} >
            <ScrollView style={{ width: win.width }}>
                {suwar.map((sura, key) => (
                    <TouchableOpacity key={key} style={styles.suratContainer} onPress={() => { setSuratKey(key + 1); setAudioStatus(true); navigation.navigate('Player'); }}>
                        <View style={styles.align}>
                            <Text style={styles.surat}>{key + 1}. {`سورة ${sura}`}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        alignItems: 'center',
        paddingTop: win.height * 0.05,
        justifyContent: 'center',
    },
    suratContainer: {
        backgroundColor: '#fff',
        width: win.width * 0.9,
        marginVertical: win.width * 0.02,
        marginHorizontal: win.width * 0.05,
        padding: win.height * 0.02,
        shadowColor: "#000",
        borderWidth: 2,
        borderColor: '#d6d8ea',
        borderRadius: 10,
        overflow: 'hidden',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    surat: {
        fontFamily: 'Arabic-Font',
        fontSize: 17,
        color: '#636363',
    },
    align: {
        width: win.width * 0.58,
    }
});
