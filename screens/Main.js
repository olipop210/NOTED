import { StyleSheet, Text, Dimensions, SafeAreaView, Alert, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

export default function Main({ navigation }) {

    useEffect(() => {
        SprawdzZalogowanie();
    }, []);

    const [kolorPrzycisk1, setKolor1] = useState('rgb(164, 154, 246)');

    function ustawCiemny1() {
        setKolor1('rgb(124, 114, 206)')
    }

    function ustawJasny1() {
        setKolor1('rgb(164, 154, 246)')
    }

    function SprawdzZalogowanie() {
        try {
            AsyncStorage.getItem('loggedEmail')
                .then(value => {
                    if (value != null) {
                        AsyncStorage.removeItem('forgotEmail');
                        AsyncStorage.removeItem('verifyEmail');
                    }
                    else {
                        Alert.alert('Uwaga', 'Zostałeś wylogowany');
                    }
                })
        } catch (error) {
            alert(error);
        }
    }

    function wyloguj() {
        try {
            AsyncStorage.removeItem('loggedEmail');
            navigation.navigate('powitalny')
        } catch (error) {
            alert(error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require('../media/NotedIcon.png')}></Image>
            <Text style={styles.tekst1}>Strona glowna</Text>
            <Pressable onPress={wyloguj} onPressOut={ustawJasny1} onPressIn={ustawCiemny1} style={[styles.przycisk1, { borderColor: kolorPrzycisk1 }]}><Text style={[styles.tekst2, { color: kolorPrzycisk1 }]}>Wyloguj</Text></Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100 * vw,
        height: 100 * vh,
        backgroundColor: 'rgb(16, 16, 16)'
    },
    logo: {
        width: 70 * vw,
        height: 40 * vh,
        alignSelf: 'center',
        marginTop: 2 * vh
    },
    tekst1: {
        color: 'rgb(224, 224, 224)',
        fontSize: 45,
        alignSelf: 'center',
        paddingTop: 5 * vh
    },
    przycisk1: {
        width: 55 * vw,
        height: 10 * vh,
        borderWidth: 3,
        borderRadius: 8 * vw,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5 * vh,

    },
    tekst2: {
        fontSize: 7 * vw,
        alignSelf: 'center',
    },
});
