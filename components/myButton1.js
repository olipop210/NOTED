import { StyleSheet, View, Dimensions, SafeAreaView, Image, Text as NativeText, TouchableOpacity} from 'react-native';
import Svg, {
    LinearGradient,
    Text,
    Defs,
    Stop,
    TSpan, 
  } from 'react-native-svg';
import { LinearGradient as GradientExpo } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;



export default function MyButton1(props){



    

    return(
        <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={[styles.przycisk1, {borderWidth: 0, width: props.szerokosc, height: props.wysokosc}]}>
        <TouchableOpacity activeOpacity={0.4} onPress={()=>{Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); props.funkcja()}} style={[styles.przycisk11, {width: props.szerokosc - 5, height: props.wysokosc - 5}]}>
        <Svg width={props.szerokosc - 5} height={props.wysokosc - 5}>
            <Defs>
                <LinearGradient id="rainbow" x1="0" x2="100%" y1="0" y2="0" gradientUnits="userSpaceOnUse" >
                <Stop stopColor='rgb(164, 154, 246)' offset="0%" />
                <Stop stopColor="rgb(242, 105, 255)" offset="100%" />
                </LinearGradient>
            </Defs>
            <Text textAnchor='middle' fill={'url(#rainbow)'}><TSpan y={props.wysokosc / 2 + props.wysokosc / 20} x={'50%'} fontSize={props.rozmiarCzcionki}>{props.tekst}</TSpan></Text>
        </Svg>
        </TouchableOpacity>
        </GradientExpo>
    );




}

const styles = StyleSheet.create({
    przycisk1: {
        borderWidth: 3,
        borderRadius: 8 * vw,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 1 * vh,
        backgroundColor: 'rgb(16, 16, 16)'
    },
    przycisk11: {
        borderRadius: 8 * vw,
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: 'rgb(16, 16, 16)'
    }
})