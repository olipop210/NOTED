import { StyleSheet, View, Dimensions, SafeAreaView, Image, Text as NativeText, TouchableOpacity, TextInput, ShadowPropTypesIOS} from 'react-native';
import Svg, {
    LinearGradient,
    Text,
    Defs,
    Stop,
    TSpan, 
  } from 'react-native-svg';
import { LinearGradient as GradientExpo } from 'expo-linear-gradient';

const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

import {useFonts} from 'expo-font'



export default function MyInput1(props){


    return(
        <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={[styles.przycisk1, {borderWidth: 0, width: props.szerokosc, height: props.wysokosc}]}>
        <View style={[styles.przycisk11, {width: props.szerokosc - 2, height: props.wysokosc - 2, marginTop: -2}]}>
        <Svg width={props.szerokosc - 5} height={props.wysokosc - 5}>
            <Defs>
                <LinearGradient id="rainbow" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse" >
                <Stop stopColor='rgb(164, 154, 246)' offset="0%" />
                <Stop stopColor="rgb(242, 105, 255)" offset="100%" />
                </LinearGradient>
            </Defs>
        </Svg>
        <TextInput onPressIn={()=>{ try{props.onPressIn()} catch(error){}}} onEndEditing={()=>{try{props.onEndEditing()} catch(error){}}} secureTextEntry={props.haslo} onChangeText={(text) => {props.odbiorTekstu(text)}} placeholder={props.placeholder} placeholderTextColor="rgb(184, 184, 184)" style={{fontSize: props.rozmiarCzcionki, color: 'white', marginTop: -4.5 * vh, marginLeft: 3 * vw}}></TextInput>
        </View>
        </GradientExpo>
    );




}

const styles = StyleSheet.create({
    przycisk1: {
        
        borderBottomLeftRadius: 2 * vh,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5 * vh,
        backgroundColor: 'rgb(16, 16, 16)', 
        borderLeftWidth: 2,
    },
    przycisk11: {
        borderBottomLeftRadius: 2 * vh,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(16, 16, 16)', 
        marginLeft: 2
    }, 
    wprowadzanie: {
        color: 'rgb(224, 224, 224)',
        width: 60 * vw,
        alignSelf: 'center',
        fontSize: 3 * vh,
        marginTop: 6 * vh,
        padding: 0.8 * vh,
        paddingTop: 1.5 * vh,
        
        borderBottomLeftRadius: 2 * vh,
    },
})