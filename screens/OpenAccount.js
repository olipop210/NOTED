import { StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, Image, Pressable, TouchableOpacity, Modal, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import MyButton2 from '../components/myButton2';
import MyButton1 from '../components/myButton1';
import { LinearGradient as GradientExpo } from 'expo-linear-gradient';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;
import * as ImagePicker from 'expo-image-picker'
import * as Haptics from 'expo-haptics'

export default function OpenAccount({ navigation }) {

    //const link = AsyncStorage.getItem('link');

    
        

    useEffect(() => {
        SprawdzZalogowanie();

        const getData = async()=>{
            await AsyncStorage.getItem('openEmail')
            .then(value => {
                if (value != null) {
                    setEmail(value);

                    var headers = {
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json',
                    }; 
                    var Data ={ 
                        Email: value, 
                    };

                    fetch("https://noted.com.pl/notedMobile/userAccount/userdata.php", {
                        headers: headers, 
                        method: 'POST', 
                        body: JSON.stringify(Data)
                    })
                    .then((response)=>response.json()) 
                    .then((response)=>{ 
                        setDataDolaczenia(response.data);
                        setObserwowani(response.obserwowani);
                        setObserwujacy(response.obserwujacy);
                        setPoziom(response.poziom);
                        setNotatki(response.notatki); 
                        setZdjecie(response.profile);
                        if(response.profile =! 'notedImages/defaultUser.png'){setDefaultProfilePicture(!isDefaultProfilePicture)}
                        if(response.poziom > 8){
                            setSzkola('Szkoła średnia');
                            setKlasa(response.poziom - 8);
                        }
                        else{
                            setSzkola('Szkoła podstawowa');
                            setKlasa(response.poziom);
                        }

                    })
                    .catch((error)=>{ 
                        alert("Error Occured " + error);
                    });
                }
                else {
                    Alert.alert('Uwaga', 'Zostałeś wylogowany');
                }
            })


    
    
            
        
        }

       
        getData();
    }, []);

    const [dataDolaczenia, setDataDolaczenia] = useState('');
    const [obserwowani, setObserwowani] = useState(0);
    const [obserwujacy, setObserwujacy] = useState(0);
    const [poziom, setPoziom] = useState(0);
    const [szkola, setSzkola] = useState('');
    const [klasa, setKlasa] = useState();
    const [iloscNotatek, setNotatki] = useState(0);
    const[sciezkaDoZdjecia, setZdjecie] = useState('');


    const[nick, setnick] = useState('');

    const [email, setEmail] = useState('');


    const [accMail, setAccMail] = useState('');

    const [accNick, setAccNick] = useState('');

    const[isDefaultProfilePicture, setDefaultProfilePicture] = useState(false)


    async function SprawdzZalogowanie() {
        
        try {
            AsyncStorage.getItem('openEmail')
            .then(value => {
                if (value != null) {
                    AsyncStorage.removeItem('forgotEmail');
                    AsyncStorage.removeItem('verifyEmail');
                    setAccMail(value); 
                }
                else {
                    Alert.alert('Uwaga', 'Zostałeś wylogowany');
                }
            })

            AsyncStorage.getItem('openNick')
            .then(value => {
                if (value != null) {
                    AsyncStorage.removeItem('forgotEmail');
                    AsyncStorage.removeItem('verifyEmail');
                    setAccNick(value);
                    
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
            AsyncStorage.clear();
            navigation.navigate('powitalny')
        } catch (error) {
            alert(error);
        }
    }

    function Gradient1(){
        return(
            <View>
            <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={{width: 100 * vw, height: 100 * vh, marginTop: -6 * vh, borderBottomLeftRadius: 5 * vw, borderBottomRightRadius: 5 * vw}} />
            </View>
        )
    }



    return (
    <SafeAreaView style={styles.container}>

        <Image   style={{width: 100*vw, height: 100*vh, position: 'absolute', opacity: 0.15, zIndex: -100}} source={require('../assets/notedBg.png')}></Image>

        <View style={{marginTop: Platform.OS == 'android'?3*vh : 0}}>
        <MyButton2 marginTop={1 * vh} funkcja={()=>{}} rozmiarCzcionki={8 * vw} wysokosc={10 * vh} szerokosc={80 * vw} tekst={accNick}></MyButton2>
        </View>
        <View style={styles.przyciskZdjecie}>
        <Image style={[styles.zdjecie, {tintColor: isDefaultProfilePicture ? 'rgb(255, 255, 255)' : null}]} source={{uri: ("https://noted.com.pl/" + sciezkaDoZdjecia)}}></Image>
        </View>
            <MyButton1 funkcja={()=>{alert('dodano do obserwowanych')}} szerokosc={40*vw} wysokosc={5*vh} tekst={'Obserwuj'} rozmiarCzcionki={2.5*vh}></MyButton1>
        <Text style={styles.opis1}>{szkola}, klasa {klasa}</Text>
        <Text style={styles.opis1}>Dołączono {dataDolaczenia}</Text>
        <Text style={styles.opis1}>{iloscNotatek} notatek</Text>
        <Text style={styles.opis1}>{obserwujacy} obserwujących</Text>
        <Text style={styles.opis1}>{obserwowani} obserwowanych</Text>
        <View style={styles.noteBox}>
            <Text style={[styles.opis1, {marginTop: 0}]}>Tu będą notatki użytkownika</Text>
        </View>

        

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
        borderColor: 'red', 
    },
    tekst2: {
        fontSize: 7 * vw,
        alignSelf: 'center',
        color: 'red'
    },
    zdjecie:{
        width: 40 * vw, 
        height: 40 * vw, 
        alignSelf: 'center', 
        borderRadius: 20*vw, 

        
    }, 
    opis1:{
        marginTop: 2 * vh,
        color: 'white',
        fontSize: 6 * vw, 
        alignSelf: 'center'
    }, 
    noteBox:{
        width: 90 * vw, 
        //minHeight: 10 * vh, 
        borderColor: 'white', 
        alignSelf: 'center',
        borderWidth: 3, 
        borderRadius: 10 * vw
    }, 
    anywhere:{
        width: 100 * vw, 
        height: 100 * vh, 
        //backgroundColor: 'rgba(255, 255, 255, 0.4)', 

    },
    modalButton:{
        //backgroundColor: 'white', 
        width: 10 * vw, 
        height: 0.5 * vh, 
        left: 15 * vw, 
        top: 30 * vh, 
        position: 'absolute'
        
    }, 
    przyciskZdjecie:{
        shadowColor: "rgb(128, 128, 128)",
        shadowOpacity: 1, 
        shadowRadius: 10
    }
});
