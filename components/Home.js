import React from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Al9ora2Array } from '../arrays/Al9ora2Array';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

const win = Dimensions.get('window');

export default function Al9ora2({ navigation, setMo9ri2Key }) {

    let [fontsLoaded] = useFonts({
        'Arabic-Font': require('../assets/fonts/NotoKufiArabic-Bold.ttf'),
    });


    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={styles.container} >
                <ScrollView style={{ width: win.width }}>
                    {Al9ora2Array.map((mo9ri2, key) => (
                        <TouchableOpacity key={key} style={styles.suratContainer} onPress={() => { setMo9ri2Key(key); navigation.navigate('SuwarHome'); }}>
                            <Text style={styles.surat}> {`${Al9ora2Array[key].name}`}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        alignItems: 'center',
        paddingTop: win.height * 0.037,
        justifyContent: 'center',
    },
    suratContainer: {
        backgroundColor: '#fff',
        width: win.width * 0.9,
        marginVertical: win.width * 0.02,
        marginHorizontal: win.width * 0.05,
        padding: win.height * 0.02,
        borderWidth: 2,
        borderColor: '#22aaf5',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
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
});
