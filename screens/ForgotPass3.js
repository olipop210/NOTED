import { StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import MyButton1 from '../components/myButton1';
import MyInput1 from '../components/myInput1';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

export default function ForgotPass3({ navigation }) {
    const [email, setEmail] = useState('');
    const [haslo, setHaslo] = useState('');
    const [haslo2, setHaslo2] = useState('');

    useEffect(()=>sprawdzZalogowanie());

    function sprawdzZalogowanie(){
        try {
            AsyncStorage.getItem('forgotEmail')
                .then(value => {
                    if (value != null) {
                        setEmail(value);
                    }
                    else {
                        Alert.alert('Błąd', 'Resetowanie hasła przerwane');
                    }
                });
        } catch (error) {
            alert(error);
        }
    }

    async function przeslij(){
        let LINK ="https://noted.com.pl/"

        var paswd = /^(?=.*[0-9])(?=.*[!@_#$%^.&*])[a-zA-Z0-9!@_#$%^.&*]{8,32}$/;
        if (!(haslo.match(paswd))) {
            Alert.alert('Błąd', 'Hasło musi składać się z conajmniej 8 znaków, w tym jednej cyfry i jednego znaku specjalnego');
        }
        else if(haslo != haslo2){
            Alert.alert('Błąd', 'Hasła nie są takie same')
        }
        else{
            var link = String( LINK + "notedMobile/PsswdReset/newpsswd.php"); 
            //do testow po prostu podmien sobie link do php co sobie robisz na localhoscie w xampie

                var headers = {
                    'Accept': 'application/json', //nie mam pojecia co to
                    'Content-Type': 'application/json',
                }; 
                var Data ={ 
                    Email: email, //tych nazw po lewej bedziesz uzywac do odbierania danych w php
                    New: haslo
                };
                fetch(link, {
                    method: 'POST', 
                    headers: headers, 
                    body: JSON.stringify(Data)
                    
                })
                .then((response)=>response.json()) //odpowiedz ktora otrzyma zamienia z JSON'a na obiekt - w tym przypadku tablice
                .then((response)=>{ //jesli wszystko git, wyswietla 0 obiekt z tablicy - czyli odpowiedz
                  alert(response.Message);
                  if(response.Status == 1){
                    try {
                        AsyncStorage.removeItem('forgotEmail'); //przechowaj w pamięci urządzenia dane o zalogowanym uzytkowniku
                        navigation.navigate('powitalny');
                        } catch (error) {
    
                            alert(error);
                        }
                  }


                })
                .catch((error)=>{ //jesli jest blad, to wyrzuca alert
                  alert("Error Occured " + error);
                });
        }
    }



    return (
        <SafeAreaView style={styles.container}>
            <Image   style={{width: 100*vw, height: 100*vh, position: 'absolute', opacity: 0.15, zIndex: -100}} source={require('../assets/notedBg.png')}></Image>
            <Text style={styles.tekst1}>Resetowanie hasła</Text>
            <Text style={styles.tekst2}>Wprowadź nowe hasło</Text>
            <MyInput1 haslo={true} placeholder={'Hasło'} odbiorTekstu={(dane) =>{setHaslo(dane)}}  rozmiarCzcionki={3 * vh} szerokosc={60 * vw} wysokosc={6 * vh}></MyInput1>
            <MyInput1 haslo={true} placeholder={'Powtórz hasło'} odbiorTekstu={(dane) =>{setHaslo2(dane)}}  rozmiarCzcionki={3 * vh} szerokosc={60 * vw} wysokosc={6 * vh}></MyInput1>
            <View style={{marginTop: 5*vh}}></View>
            <MyButton1 funkcja={()=>{przeslij()}}  wysokosc={10 * vh} szerokosc={55 * vw} tekst={'Prześlij'} rozmiarCzcionki={8 * vw}></MyButton1>
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
