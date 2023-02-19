import { StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton1 from '../components/myButton1';
import MyInput1 from '../components/myInput1';
import { useState } from 'react';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

export default function ForgotPass1({ navigation }) {

    const [email, setEmail] = useState('');


    async function doKolejnego(){
        if (email.length == 0) {
            Alert.alert('Błąd', 'Wpisz adres E-mail');
        }
        else if (email.indexOf('@') == -1) {
            Alert.alert('Błąd', 'Wpisz poprawny adres E-mail');
        }
        else{

            let LINK ="https://noted.com.pl/";

            var link = LINK +  "notedMobile/PsswdReset/psswdresset.php"; 
            
            
                var headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }; 
                var Data ={ 
                    Email: email, 
                };
                await fetch(link, {
                    method: 'POST', 
                    headers: headers, 
                    body: JSON.stringify(Data)
                    
                })
                .then((response)=>response.json()) 
                .then((response)=>{ 
                  //Alert.alert('test',response.Message);
                  if(response.Status == 1){
                    try {
                        AsyncStorage.setItem('forgotEmail', email); 
                        AsyncStorage.setItem('CzasRejestracji', String(response.CzasRejestracji))
                        navigation.navigate('resetowanieHasla2');
                        } catch (error) {
    
                            alert(error);
                        }
                  }


                })
                .catch((error)=>{ 
                  Alert.alert('test',"Error Occured " + error);
                });

        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <Image   style={{width: 100*vw, height: 100*vh, position: 'absolute', opacity: 0.15, zIndex: -100}} source={require('../assets/notedBg.png')}></Image>
            <Text style={styles.tekst1}>Resetowanie hasła</Text>
            <Text style={styles.tekst2}>Podaj adres E-mail, na który wyślemy kod do resetowania hasła </Text>
            <MyInput1 placeholder={'E-mail'} odbiorTekstu={(dane) =>{setEmail(dane)}}  rozmiarCzcionki={3 * vh} szerokosc={60 * vw} wysokosc={6 * vh}></MyInput1>
            <View style={{marginTop: 5*vh}}></View>
            <MyButton1 funkcja={doKolejnego} wysokosc={10 * vh} szerokosc={55 * vw} tekst={'Prześlij'} rozmiarCzcionki={8 * vw}></MyButton1>
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
        color: 'rgb(164, 154, 246)',
        fontSize: 30,
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
        marginTop: 8 * vh,

    },
    tekst2: {
        marginTop: 3 * vh,
        marginLeft: 5 * vw, marginRight: 5 * vw,
        fontSize: 4.5 * vw,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'rgb(222, 222, 222)',
    },
    veryficationInput:{
        width: 12 * vw, 
        height: 8 * vh, 
        borderBottomWidth: 2, 
        borderColor: 'rgb(164, 154, 246)', 
        color: 'rgb(164, 154, 246)', 
        fontSize: 5 * vh, 
        textAlign: 'center'
    }, 
    InputBox:{
        marginTop: 7 * vh,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }, 
    tekst3: {
        fontSize: 7 * vw,
        alignSelf: 'center',
    },
});
