import { StyleSheet, Text, View, Dimensions, SafeAreaView, Image,  ScrollView, Alert } from 'react-native';
import { useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton1 from '../components/myButton1';
import MyInput1 from '../components/myInput1';


const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

export default function Rejestracja({navigation}) {

    const [nazwa, setNazwa] = useState('');
    const [email, setEmail] = useState('');
    const [haslo, setHaslo] = useState('');

    const [showMargin, setMargin] = useState('none');

    const scroller = useRef();

    async function zarejestruj() {

        let LINK ="https://noted.com.pl/"

        var paswd = /^(?=.*[0-9])(?=.*[!@_#$%^&*])[a-zA-Z0-9!@_#$%^&*]{8,32}$/;

        if (nazwa == 0) {
            Alert.alert('Błąd', 'Uzupełnij pole nazwa');
            setColorInput1('rgb(200, 0, 0)');
        }
        else if (email == 0) {
            Alert.alert('Błąd', 'Uzupełnij pole email');
            setColorInput2('rgb(200, 0, 0)');
        }
        else if (haslo == 0) {
            Alert.alert('Błąd', 'Uzupełnij pole haslo');
            setColorInput3('rgb(200, 0, 0)');
        }
        else if (nazwa.length < 5 || nazwa.length > 32) {
            Alert.alert('Błąd', 'Nazwa musi zwierać od 5 do 32 znaków')
        }
        else if (email.indexOf('@') == -1) {
            Alert.alert('Błąd', 'Wpisz poprawnie adres E-mail')
            setColorInput2('rgb(200, 0, 0)');
        }
        else if (!(haslo.match(paswd))) {
            Alert.alert('Błąd', 'Hasło musi zaiwerać od 8 do 32 znaków, w tym conajmniej jedna cyfrę i znak specjalny');
            setColorInput3('rgb(200, 0, 0)');
        }
        else if (false) { //zabezpieczenie przed wprowadzaniem obrazliwego slownictwa

        }
        else {

            var link = String( LINK + "notedMobile/Register/Register.php"); 
                var headers = {
                    'Accept': 'application/json', //nie mam pojecia co to
                    'Content-Type': 'application/json',
                }; 
                var Data ={ 
                    Nick: nazwa, //tych nazw po lewej bedziesz uzywac do odbierania danych w php
                    Email: email, 
                    Password: haslo
                };
                fetch(link, {
                    method: 'POST', 
                    headers: headers, 
                    body: JSON.stringify(Data)
                })
                .then((response)=>response.text()) //odpowiedz ktora otrzyma zamienia z JSON'a na obiekt - w tym przypadku tablice
                .then((response)=>{ //jesli wszystko git, wyswietla 0 obiekt z tablicy - czyli odpowiedz

                    let tmp = response.indexOf('Status') + 8; //8 znaków po od litery 'S' jest liczba
                    let responseStatus = parseInt(response.charAt(tmp));

                    tmp = response.indexOf('CzasRejestracji') + 17; //8 znaków po od litery 'S' jest liczba
                    let tmp2 = response.lastIndexOf('}');
                    let czasRejestracji = response.slice(tmp, tmp2);


                  //alert(czasRejestracji);
                  if(responseStatus == 1){
                    try {
                        AsyncStorage.setItem('verifyEmail', email); //przechowaj w pamięci urządzenia dane o zalogowanym uzytkowniku
                        AsyncStorage.setItem('CzasRejestracji', String(czasRejestracji));
                        AsyncStorage.setItem('profilePicture', 'notedImages/defaultUser.png');
                        AsyncStorage.setItem('loggedNick', nazwa)
                        navigation.navigate('weryfikacja');
                        } catch (error) {
                            alert(error);
                        }
                  }
                  else{

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
            <ScrollView ref={scroller}>
                <Text style={styles.tekst1}>Zarejestruj się</Text>
                <Image style={styles.logo} source={require('../media/NotedIcon.png')}></Image>
                <MyInput1 onEndEditing={()=>{ setTimeout(()=>{setMargin('none')}, 20) }} onPressIn={()=>{setMargin('flex'); setTimeout(()=>{scroller.current.scrollTo({x: 0, y: 20, animated: true}), 20}) }} szerokosc={60 * vw} wysokosc={6 * vh} rozmiarCzcionki={3 * vh} placeholder={'Nazwa'} odbiorTekstu={(dane)=>{setNazwa(dane)}}></MyInput1>
                <MyInput1 onEndEditing={()=>{ setTimeout(()=>{setMargin('none')}, 20) }}  onPressIn={()=>{setMargin('flex'); setTimeout(()=>{scroller.current.scrollTo({x: 0, y: 100, animated: true}), 20}) }} szerokosc={60 * vw} wysokosc={6 * vh} rozmiarCzcionki={3 * vh} placeholder={'Adres E-mail'} odbiorTekstu={(dane)=>{setEmail(dane)}}></MyInput1>
                <MyInput1 onEndEditing={()=>{ setTimeout(()=>{setMargin('none')}, 20) }}  onPressIn={()=>{setMargin('flex'); setTimeout(()=>{scroller.current.scrollTo({x: 0, y: 200, animated: true}), 20}) }} haslo={true} szerokosc={60 * vw} wysokosc={6 * vh} rozmiarCzcionki={3 * vh} placeholder={'Hasło'} odbiorTekstu={(dane)=>{setHaslo(dane)}}></MyInput1>
                <MyButton1 rozmiarCzcionki={7 * vw} wysokosc={10*vh} szerokosc={60 * vw} funkcja={zarejestruj} tekst={'Zarejestruj się'}></MyButton1>
                <View style={{marginTop: 50*vh, display: showMargin}}></View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100 * vw,
        height: 100 * vh,
        backgroundColor: 'rgb(16, 16, 16)'
    },
    tekst1: {
        color: 'rgb(224, 224, 224)',
        fontSize: 45,
        alignSelf: 'center',
        paddingTop: 5 * vh
    },
    logo: {
        width: 50 * vw,
        height: 30 * vh,
        alignSelf: 'center',
        marginTop: 2 * vh
    },
    wprowadzanie: {
        color: 'rgb(224, 224, 224)',
        width: 60 * vw,
        alignSelf: 'center',
        fontSize: 3 * vh,
        marginTop: 6 * vh,
        padding: 0.8 * vh,
        paddingTop: 1.5 * vh,
        borderLeftWidth: 2,
        borderBottomWidth: 2,
        borderBottomLeftRadius: 2 * vh,
    },
    tekst2: {
        fontSize: 7 * vw,
        alignSelf: 'center',
    },
    przycisk1: {
        width: 60 * vw,
        height: 10 * vh,
        borderWidth: 3,
        borderRadius: 8 * vw,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 7 * vh,
        marginBottom: 10 * vh,
    },
});
