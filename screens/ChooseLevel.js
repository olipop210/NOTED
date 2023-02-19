import { StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import MyButton1 from '../components/myButton1';
import MyButton2 from '../components/myButton2';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

export default function ChooseLevel({ navigation }) {

    const [email, setEmail] = useState('');
    const [wyboranyPoziom, setPoziom] = useState(false); //false - podstawowka, true - szkola srednia
    const [klasa, setKlasa] = useState(0);
    

    useEffect(()=>sprawdzZalogowanie());

    function sprawdzZalogowanie(){
        try {
            AsyncStorage.getItem('loggedEmail')
                .then(value => {
                    if (value != null) {
                        setEmail(value);
                    }
                    else {
                        Alert.alert('Błąd', 'Wylogowano');
                    }
                });
        } catch (error) {
            alert(error);
        }
    }


    async function wyslij(){

        if (klasa > 0){
            var link = String( "https://noted.com.pl/" + "notedMobile/schoolsubjects/class.php"); 
            //do testow po prostu podmien sobie link do php co sobie robisz na localhoscie w xampie

                var headers = {
                    'Accept': 'application/json', //nie mam pojecia co to
                    'Content-Type': 'application/json',
                }; 
                var Data ={ 
                    Email: email, //tych nazw po lewej bedziesz uzywac do odbierania danych w php
                    Class: klasa
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
                        try{
                            AsyncStorage.removeItem('Klasa');
                            AsyncStorage.setItem('Klasa', String(klasa));
                            if(klasa > 7){
                                AsyncStorage.setItem('Poziom', 'Szkoła średnia');
                            }
                            else{
                                AsyncStorage.setItem('Poziom', 'Szkoła podstawowa');
                            }
                            navigation.navigate('wyborPrzedmiotow');
                        } catch(error){
                            alert(error);
                        }
                    }
                
            });

            
        }


    }

    return (
        <SafeAreaView style={styles.container}>
            <Image   style={{width: 100*vw, height: 100*vh, position: 'absolute', opacity: 0.15, zIndex: -100}} source={require('../assets/notedBg.png')}></Image>
            <Text style={styles.tekst1}>Wybierz poziom i klasę</Text>
            <View style={styles.box1}>
            <MyButton2 funkcja={()=>{setPoziom(false)}} wysokosc={10 * vh} szerokosc={45 * vw} tekst={"Szkoła Podstawowa"} rozmiarCzcionki={4.5 * vw}></MyButton2>
            <MyButton2 funkcja={()=>{setPoziom(true)}} wysokosc={10 * vh} szerokosc={45 * vw} tekst={"Szkoła Średnia"} rozmiarCzcionki={4.5 * vw}></MyButton2>
            </View>
            {wyboranyPoziom ? <Technikum aktualizacja={(x)=>{setKlasa(x)}}></Technikum>  :  <Podstawowka aktualizacja={(x)=>{setKlasa(x)}}></Podstawowka>}
            <MyButton1 funkcja={()=>{wyslij()}} wysokosc={10 * vh} szerokosc={60 * vw} tekst={'Dalej'} rozmiarCzcionki={8 * vw}></MyButton1>

        </SafeAreaView>
    );
}

function Podstawowka (props){
    const [x1, setx1] = useState(0);
    const [x2, setx2] = useState(0);
    const [x3, setx3] = useState(0);
    const [x4, setx4] = useState(0);
    const [x5, setx5] = useState(0);
    const [x6, setx6] = useState(0);
    const [x7, setx7] = useState(0);
    const [x8, setx8] = useState(0);
    return(
        <View>
            <View style={styles.box3}>
                <View style={{marginLeft: -12 * vw}}>
                    <View style={styles.box2}>
                    <MyButton1  wysokosc={7 * vh} funkcja={()=>{setx1(1); setx2(0);setx4(0);setx3(0); setx5(0); setx6(0); setx7(0); setx8(0); props.aktualizacja(1)}} szerokosc={30 * vw} tekst={'Klasa I'} rozmiarCzcionki={5 * vw}></MyButton1>
                    <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x1}} source={require('../media/check.png')}></Image>
                    </View>
                    <View style={styles.box2}>
                    <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(1);setx4(0);setx3(0); setx5(0); setx6(0); setx7(0); setx8(0); props.aktualizacja(2)}} szerokosc={30 * vw} tekst={'Klasa II'} rozmiarCzcionki={5 * vw}></MyButton1>
                    <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x2}} source={require('../media/check.png')}></Image>
                    </View>
                    <View style={styles.box2}>
                    <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(0);setx4(0);setx3(1); setx5(0); setx6(0); setx7(0); setx8(0); props.aktualizacja(3)}} szerokosc={30 * vw} tekst={'Klasa III'} rozmiarCzcionki={5 * vw}></MyButton1>
                    <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x3}} source={require('../media/check.png')}></Image>
                    </View>
                    <View style={styles.box2}>
                    <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(0);setx4(1);setx3(0); setx5(0); setx6(0); setx7(0); setx8(0); props.aktualizacja(4)}} szerokosc={30 * vw} tekst={'Klasa IV'} rozmiarCzcionki={5 * vw}></MyButton1>
                    <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x4}} source={require('../media/check.png')}></Image>
                    </View>
                </View>

                <View style={{marginLeft: -18 * vw}}>
                    <View style={styles.box2}>
                    <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(0);setx4(0);setx3(0); setx5(1); setx6(0); setx7(0); setx8(0); props.aktualizacja(5)}} szerokosc={30 * vw} tekst={'Klasa V'} rozmiarCzcionki={5 * vw}></MyButton1>
                    <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x5}} source={require('../media/check.png')}></Image>
                    </View>
                    <View style={styles.box2}>
                    <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(0);setx4(0);setx3(0); setx5(0); setx6(1); setx7(0); setx8(0); props.aktualizacja(6)}} szerokosc={30 * vw} tekst={'Klasa VI'} rozmiarCzcionki={5 * vw}></MyButton1>
                    <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x6}} source={require('../media/check.png')}></Image>
                    </View>
                    <View style={styles.box2}>
                    <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(0);setx4(0);setx3(0); setx5(0); setx6(0); setx7(1); setx8(0); props.aktualizacja(7)}} szerokosc={30 * vw} tekst={'Klasa VII'} rozmiarCzcionki={5 * vw}></MyButton1>
                    <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x7}} source={require('../media/check.png')}></Image>
                    </View>
                    <View style={styles.box2}>
                    <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(0);setx4(0);setx3(0); setx5(0); setx6(0); setx7(0); setx8(1); props.aktualizacja(8)}} szerokosc={30 * vw} tekst={'Klasa VIII'} rozmiarCzcionki={5 * vw}></MyButton1>
                    <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x8}} source={require('../media/check.png')}></Image>
                    </View>
                </View>
            </View>
        </View>
    )
}

function Technikum (props){
    const [x1, setx1] = useState(0);
    const [x2, setx2] = useState(0);
    const [x3, setx3] = useState(0);
    const [x4, setx4] = useState(0);
    return(
        <View>
            <View style={styles.box2}>
            <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(1); setx2(0);setx4(0);setx3(0); props.aktualizacja(9)}} szerokosc={60 * vw} tekst={'Klasa I'} rozmiarCzcionki={5 * vw}></MyButton1>
            <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x1}} source={require('../media/check.png')}></Image>
            </View>
            <View style={styles.box2}>
            <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(1);setx4(0);setx3(0); props.aktualizacja(10)}} szerokosc={60 * vw} tekst={'Klasa II'} rozmiarCzcionki={5 * vw}></MyButton1>
            <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x2}} source={require('../media/check.png')}></Image>
            </View>
            <View style={styles.box2}>
            <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(0);setx4(0);setx3(1); props.aktualizacja(11)}} szerokosc={60 * vw} tekst={'Klasa III'} rozmiarCzcionki={5 * vw}></MyButton1>
            <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x3}} source={require('../media/check.png')}></Image>
            </View>
            <View style={styles.box2}>
            <MyButton1 wysokosc={7 * vh} funkcja={()=>{setx1(0); setx2(0);setx4(1);setx3(0); props.aktualizacja(12)}} szerokosc={60 * vw} tekst={'Klasa IV'} rozmiarCzcionki={5 * vw}></MyButton1>
            <Image style={{width: 15 * vw, height: 7 * vh, tintColor: 'rgb(164, 154, 246)', marginTop: 5 * vh, opacity: x4}} source={require('../media/check.png')}></Image>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100 * vw,
        height: 100 * vh,
        backgroundColor: 'rgb(16, 16, 16)'
    },

    tekst1: {
        color: 'rgb(164, 154, 246)',
        fontSize: 30,
        alignSelf: 'center',
    },
    
    
    box1: {
        alignSelf: 'center',
        flexDirection: 'row', 
        alignContent: 'space-between'
    }, 
    box2:{
        flexDirection: 'row', 
        marginLeft: 20 * vw
    }, 
    box3:{
        flexDirection: 'row', 
    }
});
