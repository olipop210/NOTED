import { useState } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, Image} from 'react-native';
import Svg, {
    LinearGradient,
    Text,
    Defs,
    Stop,
    TSpan, 
  } from 'react-native-svg';

import MyButton1 from '../components/myButton1';





const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;


export default function Powitalny({ navigation }) {



    function doLogowania() {
        navigation.navigate('logowanie')
    }

    function doRejestracji() {
        navigation.navigate('rejestracja')
    }

    return (

        <SafeAreaView style={styles.container}>

            <Image   style={{width: 100*vw, height: 100*vh, position: 'absolute', opacity: 0.3}} source={require('../assets/notedBg.png')}></Image>
            
            <Svg height={13 * vh}  style={{shadowColor: 'rgb(0,0,0)', shadowOpacity: 1 , shadowRadius: 25}}
             width={100 * vw}>
            <Defs>
                <LinearGradient id="rainbow" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse" >
                <Stop stopColor='rgb(164, 154, 246)' offset="0%" />
                <Stop stopColor="rgb(242, 105, 255)" offset="100%" />
                </LinearGradient>
            </Defs>
            <Text textAnchor='middle' fill="url(#rainbow)">
                <TSpan  fontSize="45" x={50 * vw} y={10 * vh} >Witaj w Noted</TSpan>
            </Text>
            </Svg>
            
            <Image style={styles.logo} source={require('../media/NotedIconNoBg.png')}></Image>

            <MyButton1 rozmiarCzcionki={7 * vw} szerokosc={55 * vw} wysokosc={10 * vh} funkcja={doLogowania} tekst={'Zaloguj się'}></MyButton1>
            <View style={{marginTop: 5 * vh}}></View>
            <MyButton1 rozmiarCzcionki={7 * vw} szerokosc={55 * vw} wysokosc={10 * vh} funkcja={doRejestracji} tekst={'Zarejestruj się'}></MyButton1>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100 * vw,
        height: 100 * vh,
        backgroundColor: 'rgb(16, 16, 16)', 
        
    },
    tekst1: {
        color: 'rgb(164, 154, 246)',
        fontSize: 45,
        alignSelf: 'center',
        paddingTop: 5 * vh
    },
    logo: {
        width: 80 * vw,
        height: 40 * vh,
        alignSelf: 'center',
        shadowColor: 'rgb(0,0,0)', 
        shadowRadius: 20, 
        shadowOpacity: 1
    },
    tekst2: {
        fontSize: 7 * vw,
        alignSelf: 'center',
    },
    przycisk1: {
        width: 55 * vw,
        height: 10 * vh,
        borderWidth: 3,
        borderRadius: 8 * vw,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5 * vh,
        backgroundColor: 'rgb(16, 16, 16)'
    },
    przycisk11: {
        width: 55 * vw - 5,
        height: 10 * vh - 5,
        borderRadius: 8 * vw,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(16, 16, 16)'
    }

});
