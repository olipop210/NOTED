import { StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, TextInput, Keyboard, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import MyButton1 from '../components/myButton1';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

export default function ForgotPass2({ navigation }) {

    const [email, setEmail] = useState('');
    const [czas, setCzas] = useState(0);
    const [val1, setval1] = useState(0);
    const [val2, setval2] = useState(0);
    const [val3, setval3] = useState(0);
    const [val4, setval4] = useState(0);
    const [val5, setval5] = useState(0);
    const [val6, setval6] = useState(0);

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
            AsyncStorage.getItem('CzasRejestracji')
                .then(value=>{
                    if(value != null){
                        setCzas(value);
                    }
                })
        } catch (error) {
            alert(error);
        }
    }

    async function wysylanie(){

        let LINK ="https://noted.com.pl/"

        var kod = val6 + val5 * 10 + val4 * 100 + val3 * 1000 + val2 * 10000 + val1 * 100000;
        if(kod > 100000){
            var link = LINK + "notedMobile/PsswdReset/psswdresetvc.php"; 
            //do testow po prostu podmien sobie link do php co sobie robisz na localhoscie w xampie
            var headers = {
                'Accept': 'application/json', //nie mam pojecia co to
                'Content-Type': 'application/json',
            }; 
            var Data ={ 
                Email: email, //tych nazw po lewej bedziesz uzywac do odbierania danych w php
                Kod: kod, 
                Czas: czas
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
                        navigation.navigate('ResetowanieHasla3');
                    } catch (error) {
    
                        alert(error);
                    }
                }


            })
            .catch((error)=>{ //jesli jest blad, to wyrzuca alert
                alert("Error Occured " + error);
            });
        }
        else{
            Alert.alert('Błąd', 'Wpisz kod poprawnie');
        }
    }

    const ref1 = useRef(); const ref2 = useRef(); const ref3 = useRef(); const ref4 = useRef(); const ref5 = useRef(); const ref6 = useRef(); 

    return (
        <SafeAreaView style={styles.container}>
            <Image   style={{width: 100*vw, height: 100*vh, position: 'absolute', opacity: 0.15, zIndex: -100}} source={require('../assets/notedBg.png')}></Image>
            <Text style={styles.tekst1}>Resetowanie hasła</Text>
            <Text style={styles.tekst2}>Wysłaliśmy na adres e mail <Text style={[styles.tekst2, {textDecorationLine: 'underline', color: 'rgb(164, 154, 246)'}]}> {email} </Text>wiadomość z kodem weryfikacyjnym. Wpisz kod z wiadomości poniżej</Text>
            <View style={styles.InputBox}>
            <TextInput  onChangeText={(text) => { if (text.length > 0) ref2.current.focus(); setval1(parseInt(text))}} ref={ref1} maxLength={1} keyboardType={'numeric'} style={styles.veryficationInput}></TextInput>
            <TextInput  onChangeText={(text) => { if (text.length > 0) {ref3.current.focus()} else {ref1.current.focus()}; setval2(parseInt(text))}} ref={ref2} maxLength={1} keyboardType={'number-pad'} style={styles.veryficationInput}></TextInput>
            <TextInput onChangeText={(text) => { if (text.length > 0) {ref4.current.focus()} else {ref2.current.focus()}; setval3(parseInt(text))}} ref={ref3} maxLength={1} keyboardType={'number-pad'} style={styles.veryficationInput}></TextInput>
            <TextInput onChangeText={(text) => { if (text.length > 0) {ref5.current.focus()} else {ref3.current.focus()}; setval4(parseInt(text))}} ref={ref4} maxLength={1} keyboardType={'number-pad'} style={styles.veryficationInput}></TextInput>
            <TextInput onChangeText={(text) => { if (text.length > 0) {ref6.current.focus()} else {ref4.current.focus()}; setval5(parseInt(text))}} ref={ref5} maxLength={1} keyboardType={'number-pad'} style={styles.veryficationInput}></TextInput>
            <TextInput onChangeText={(text) => { if (text.length > 0) {Keyboard.dismiss()} else {ref5.current.focus()}; setval6(parseInt(text))}} ref={ref6} maxLength={1} keyboardType={'number-pad'} style={styles.veryficationInput}></TextInput>
            </View>
            <MyButton1 funkcja={wysylanie} wysokosc={10 * vh} szerokosc={55 * vw} tekst={'Prześlij'} rozmiarCzcionki={8 * vw}></MyButton1>
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
