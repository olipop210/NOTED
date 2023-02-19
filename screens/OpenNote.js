import { StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, Platform, ScrollView, Image, FlatList, Pressable, Animated, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MyButton2 from '../components/myButton2';
import MyButton3 from '../components/myButton3';
import { LinearGradient as GradientExpo } from 'expo-linear-gradient';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;


export default function OpenNote({ navigation }) {

    useEffect(() => {
        SprawdzZalogowanie();
        ZaladujNotatke();
    }, []);

    const [tytul, setTytul] = useState('');
    const [autor, setAutor] = useState('');
    const [iloscPolubien, setPolubienia] = useState(0);
    const [zdjecia, setZdjecia] = useState(['https://noted.com.pl/Placeholders/nodejs.png', 'https://noted.com.pl/Placeholders/nodejs1.png', 'https://noted.com.pl/Placeholders/nodejs2.jpg', 'https://noted.com.pl/Placeholders/nodejs3.png']);
    const [pozycja, setPozycja] = useState(0);
    const [pfpAutora, setPfpAutora] = useState('https:/noted.com.pl/notedImages/PFP-63eed0004a80e.jpg')
    const [czyPolubione, setPolubione] = useState(false);
    const [czyZapisane, setZapisane] = useState(false);
    const [emailAutora, setEmailAutora] = useState('');

    const lista = useRef();

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

    function ZaladujNotatke(){
        AsyncStorage.getItem('idOtwieranejNotatki')
        .then(value => {
            if (value != null) {
                //tu bedziemy wyciagac dane z API noted, narazie dane przekazuje z pamieci zapisanej w glownym panelu, wyjatekiem sa zdjecia
                AsyncStorage.getItem('tytulOtwieranejNotatki').then(value=>{setTytul(value)})
                AsyncStorage.getItem('autorOtwieranejNotatki').then(value=>{setAutor(value)})
                AsyncStorage.getItem('iloscPolubienNotatki').then(value=>{setPolubienia(parseInt(value))});
                AsyncStorage.getItem('czyPolubione').then(value=>{ setPolubione(value)})
                AsyncStorage.getItem('czyZapisane').then(value=>{setZapisane(value)});
                AsyncStorage.getItem('emailAutora').then(value=>{setEmailAutora(value)})
            }
            else {
                navigation.goBack();
            }
        })
    }

    function FlatlistComponent(props){

        const[skala, setSkala] = useState(new Animated.Value(1));
        const[x, setX] = useState(new Animated.Value(0));
        const[y, setY] = useState(new Animated.Value(0));


        const przyblizZdjecie= (event)=>{
            console.log(event.nativeEvent.focalX);
            setSkala(event.nativeEvent.scale);
            setX(45*vw - event.nativeEvent.focalX)
            setY(45*vw - event.nativeEvent.focalY)
        }

        return(

            <PinchGestureHandler onHandlerStateChange={(e)=>{if(e.nativeEvent.state == State.END){setSkala(1); setX(0); setY(0)}}} onGestureEvent={(event)=>{przyblizZdjecie(event)}}>
            <View style={{flexDirection: 'row'}}>
                <Animated.Image style={{width: 90*vw, height: 90*vw, marginLeft: 5*vw, marginRight: 5*vw, transform: [ { scale: skala}, {translateX: x}, {translateY: y}]}} source={{uri: props.sciezka}}></Animated.Image>
                <Pressable onPress={()=>{ try{lista.current.scrollToIndex({index: pozycja - 1, animated: true}); setPozycja(pozycja-1)}catch(error){console.log(error)} }}  style={{width: 45*vw, height: 90*vw, zIndex:5, marginLeft: -90*vw}}></Pressable>
                <Pressable onPress={()=>{ try{lista.current.scrollToIndex({index: pozycja + 1, animated: true}); setPozycja(pozycja+1)}catch(error){console.log(error)} }} style={{width: 45*vw, height: 90*vw, zIndex: 5}}></Pressable>
            </View>
            </PinchGestureHandler>

        )
    }

    function doProfilu(email, nickname){
        AsyncStorage.setItem('openEmail', email);
        AsyncStorage.setItem('openNick', nickname);
        navigation.navigate('otworzProfil');
    }

    //<MyButton1 rozmiarCzcionki={7 * vw} szerokosc={55 * vw} wysokosc={10 * vh} funkcja={doLogowania} tekst={'Zaloguj się'}></MyButton1>

    return (
    <View style={styles.container}>
        <Gradient1/>
        <SafeAreaView  style={{ width: 100*vw, height: Platform.OS == 'android' ? 15*vh : 13*vh , alignItems: 'center', justifyContent: 'center', position: 'absolute', color: 'white'}}>
        <Text numberOfLines={2} style={{color: 'white', fontSize: 10*vw,alignSelf: 'center', height: '100%', marginTop:  Platform.OS == 'android' ? 10*vw : null, textAlign: 'center'}}>{tytul}</Text>
        </SafeAreaView>
        <ScrollView bounces={false} style={styles.notesContainer}>

            <TouchableOpacity onPress={()=>{doProfilu(emailAutora, autor)}} activeOpacity={0.4} style={{flexDirection: 'row' ,borderColor: 'white', width: 90*vw, alignSelf: 'center', justifyContent: 'space-evenly', height: 20*vw, borderRadius: 5*vw, marginTop: 1*vh}}>
            <Image style={{flex: 0.60, borderRadius: 15*vw}} source={{uri: pfpAutora}}></Image>
            <Text numberOfLines={3} style={{fontSize: 5*vw, color: 'white', flex: 2, alignSelf: 'center', marginLeft: 3*vw }}>{autor}</Text>
            </TouchableOpacity>


            <FlatList
            ref={lista}
            style={{width: 100*vw, height: 95*vw }}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            scrollEnabled={false}
            horizontal={true}
            renderItem={({item})=> <FlatlistComponent sciezka={item}/>}
            data={zdjecia}
            />





            <View style={{height: 10*vh, flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'center', marginTop: 2*vh, width: 90*vw}}>
                <TouchableOpacity onPress={()=>{setPolubione(!czyPolubione)}} activeOpacity={0.4} style={{ flex: 1, alignSelf: 'center', alignItems: 'center'}}>
                    <Image source={require('../assets/newIcons/serce.png')} style={{height: 8*vh, width: 8*vh, tintColor: czyPolubione ? 'red' : null}}></Image>
                    <Text style={{color: czyPolubione ? 'red': 'white', top: -6*vh, fontSize: 18}}>{iloscPolubien}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{alert(czyZapisane ? 'Usunięto z zapisanych' : 'Dodano do zapisanych'); setZapisane(!czyZapisane)}} activeOpacity={0.4} style={{ flex: 1, alignSelf: 'center', alignItems: 'center'}}>
                    <Image source={require('../assets/newIcons/zapisane2.png')} style={{height: 8*vh, width: 8*vh, marginTop: -2*vh, tintColor: czyZapisane ? 'blue' : null}}></Image>
                </TouchableOpacity>
                <View style={{flex: 2, flexDirection: 'column'}}>
                    <Text style={{color: 'white', fontSize: 18}}>Matematyka, kl. 3</Text>
                    <Text style={{color: 'white', fontSize: 18}}>Szkoła średnia</Text>
                    <Text style={{color: 'white', fontSize: 18}}>31.02.2023</Text>
                </View>
            </View>



            <View style={{width: 90*vw, marginTop: 2*vh, alignSelf: 'center', borderWidth: 2, borderRadius: 5*vw, borderColor: 'white'}}>
                <Text style={{alignSelf: 'center', color: 'white', fontSize: 7*vw}}>Komentarze</Text>
                <Text style={{alignSelf: 'center', color: 'white', fontSize: 7*vw, marginTop: 7*vw}}>TODO</Text>
            </View>
        </ScrollView>
    </View>
            
    );
}

function Gradient1(){
    return(
        <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={{width: 100 * vw, height: 13*vh, paddingTop: 3*vh}} />
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100 * vw,
        height: 100 * vh,
        backgroundColor: 'rgb(16, 16, 16)'
    },
    notesContainer:{
        width: 100*vw
    }
});
