import { StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, FlatList, Image, TouchableOpacity, ScrollView, Pressable, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import UpperTab from './UpperTab';
import { LinearGradient as GradientExpo } from 'expo-linear-gradient';
import MyButton1 from '../components/myButton1';
import * as Haptics from 'expo-haptics';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import * as Clipboard from 'expo-clipboard';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;



export default function Home({ navigation }) {

    useEffect(() => {
        SprawdzZalogowanie();
    }, []);

    const [nick, setNick] = useState('');

    const [notatkiObserwowanych, aktualizujNotatkiObserwowanych] = useState([
        {
            zdjecie: 'https://noted.com.pl/Placeholders/nodejs.png', 
            autor: 'ProducentRobi', 
            email: 'producentrobi12@gmail.com', 
            polubienia: 2340, 
            tytul: 'NodeJS - podstawy', 
            czyPolubione: false,
            czyZapisane: true,
            idNotatki: 456
        }, 
        {
            zdjecie: 'https://noted.com.pl/Placeholders/alkany.jpg', 
            autor: 'Pani Baruś', 
            email: 'Anna.Barus@o2.pl', 
            polubienia: 2137, 
            tytul: 'Alkany Alkeny Alkiny', 
            czyPolubione: true,
            czyZapisane: false,
            idNotatki: 165
        }, 
        {
            zdjecie: 'https://noted.com.pl/Placeholders/Qt.png', 
            autor: 'ŚP. Pan Kamil', 
            email: 'khajdukiewicz@gmail.com', 
            polubienia: 420, 
            tytul: 'Qt - logowanie', 
            czyPolubione: true,
            czyZapisane: false,
            idNotatki: 123
        }
    ])

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
                });
            AsyncStorage.getItem('loggedNick')
                .then(value => {
                    if (value != null) {
                        AsyncStorage.removeItem('forgotEmail');
                        AsyncStorage.removeItem('verifyEmail');
                        setNick(value);
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
            AsyncStorage.removeItem('loggedEmail');
            navigation.navigate('powitalny')
        } catch (error) {
            alert(error);
        }
    }

    function doProfilu(email, nickname){
        AsyncStorage.setItem('openEmail', email);
        AsyncStorage.setItem('openNick', nickname);
        navigation.navigate('otworzProfil');
    }

    const Polecany1 = ({nazwa, zdjecie, email}) =>(
        <View style={styles.polecany}>
            <TouchableOpacity onPress={()=>{doProfilu(email, nazwa)}} activeOpacity={0.4}>
            <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(190, 138, 249)"]} style={{width: 27*vw, height: 35*vw, position: 'absolute', borderRadius: 4*vw}} />

            <Image style={{width: 22*vw, height: 22*vw, alignSelf: 'center', marginTop: 1*vw, borderRadius: 15*vw}} source={{uri: (zdjecie)}}></Image>
            <Text style={{alignSelf: 'center', marginTop: 0.2*vh}}>{nazwa}</Text>
            <TouchableOpacity onPress={()=>{alert(email)}} style={{alignSelf: 'center', marginTop: 0.5*vh }} activeOpacity={0.3}><Text style={{color: 'white'}}>Obserwuj</Text></TouchableOpacity>
            </TouchableOpacity>
        </View>
    )

    const Polecany2 = ({nazwa, zdjecie, email}) =>(
        <View style={styles.polecany}>
            <TouchableOpacity onPress={()=>{doProfilu(email, nazwa)}} activeOpacity={0.4}>
            <GradientExpo start={[0, 0]} end={[1, 0]} colors={[ "rgb(190, 138, 249)", "rgb(216, 122, 252)"]} style={{width: 27*vw, height: 35*vw, position: 'absolute', borderRadius: 4*vw}} />

            <Image style={{width: 22*vw, height: 22*vw, alignSelf: 'center', marginTop: 1*vw, borderRadius: 15*vw}} source={{uri: (zdjecie)}}></Image>
            <Text style={{alignSelf: 'center', marginTop: 0.2*vh}}>{nazwa}</Text>
            <TouchableOpacity onPress={()=>{alert(email)}} style={{alignSelf: 'center', marginTop: 0.5*vh }} activeOpacity={0.3}><Text style={{color: 'white'}}>Obserwuj</Text></TouchableOpacity>
            </TouchableOpacity>
        </View>
    )

    const Polecany3 = ({nazwa, zdjecie, email}) =>(
        <View style={styles.polecany}>
            <TouchableOpacity onPress={()=>{doProfilu(email, nazwa)}} activeOpacity={0.4}>
            <GradientExpo start={[0, 0]} end={[1, 0]} colors={["rgb(216, 122, 252)", "rgb(242, 105, 255)"]} style={{width: 27*vw, height: 35*vw, position: 'absolute', borderRadius: 4*vw}} />
            <Image style={{width: 22*vw, height: 22*vw, alignSelf: 'center', marginTop: 1*vw, borderRadius: 15*vw}} source={{uri: (zdjecie)}}></Image>
            <Text style={{alignSelf: 'center', marginTop: 0.2*vh}}>{nazwa}</Text>
            <TouchableOpacity onPress={()=>{alert(email)}} style={{alignSelf: 'center', marginTop: 0.5*vh }} activeOpacity={0.3}><Text style={{color: 'white'}}>Obserwuj</Text></TouchableOpacity>
            </TouchableOpacity>
        </View>
    )

    var polecany1={
        nazwa: 'ProducentRobi', 
        email: 'producentrobi12@gmail.com', 
        image: 'https://noted.com.pl/notedImages/PFP-63e15e21c4719.jpg', 
    };

    var polecany2 ={
        nazwa: 'Noted Official', 
        email: 'verify.noted@gmail.com',
        image: 'https://noted.com.pl/notedImages/defaultUser.png',
    }

    var polecany3 ={
        nazwa: 'Nickker', 
        email: 'iAmNickker@gmail.com',
        image: 'https://noted.com.pl/notedImages/defaultUser.png', 
    }


    

    const Notatka = (props)=>
    {

        

        const otworzNotatke = async (idNotatki)=>{
            await AsyncStorage.setItem('idOtwieranejNotatki', String(idNotatki));
            await AsyncStorage.setItem('tytulOtwieranejNotatki', props.tytul);
            await AsyncStorage.setItem('autorOtwieranejNotatki', props.autor);
            await AsyncStorage.setItem('iloscPolubienNotatki', String(props.polubienia))
            await AsyncStorage.setItem('czyPolubione', czyPolubione ? 'true' : '');
            await AsyncStorage.setItem('czyZapisane', props.czyZapisane ? 'true' : '');
            await AsyncStorage.setItem('emailAutora', props.email);
            navigation.navigate('otworzNotatke')
        }

        const [czyPolubione, setPolubione] = useState(props.czyPolubione ? true : false);
        const [holdNote, setHoldNote] = useState(false);
        const [showShare, setShowShare] = useState(false);
        const [qrCodeLink, setQrCodeLink] = useState('https://noted.com.pl');
        const [temp, setTemp] = useState('Kopiuj link')
        const [qrStyle, setQrStyle] = useState(true);

        function udostepnij(){
            setQrCodeLink('https://noted.com.pl')
            setHoldNote(!holdNote);
            setShowShare(!showShare);

        }

        return(
        <TouchableOpacity onLongPress={()=>{setHoldNote(!holdNote); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}} activeOpacity={0.4} onPress={()=>{otworzNotatke(props.idNotatki)}} style={styles.notatkaThumbnail}>
            <Image numberOfLines={1} style={{width: '100%', height: 18*vh, alignSelf: 'center', borderTopLeftRadius: 3*vw, borderTopRightRadius: 3*vw}} source={{uri: (props.zdjecie)}}></Image>
            <Text style={{color: 'white', fontSize: 16, width: '80%', textAlign: 'center'}}>{props.tytul}</Text>

            <TouchableOpacity style={{ width: 40*vw, left: 5, top: 6}}>
                <Text style={{color: 'white', width: 40*vw}} numberOfLines={1} >Autor: {props.autor} </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setPolubione(!czyPolubione)}} activeOpacity={0.4} style={{ height: 40, width: 40, alignSelf: 'flex-end', marginTop: -32, marginRight: 5}}>
                <Image source={require('../assets/newIcons/serce.png')} style={{height: 40, width: 40, tintColor: czyPolubione ? 'red' : null}}></Image>
                <Text style={{color: czyPolubione ? 'red': 'white', top: -35, textAlign: 'center'}}>{props.polubienia}</Text>
            </TouchableOpacity>

            <Modal 
            animationType="fade"
            transparent={true}
            visible={holdNote}
            onRequestClose={()=>{setHoldNote(!holdNote)}}
            >
                <Pressable style={styles.anywhere} onPress={()=>{setHoldNote(!holdNote)}}>

                    <View style={[styles.anywhere, {opacity: 0.3}]}>
                    <Gradient2/>
                    </View>

                    <View style={{ position: 'absolute', bottom: 5*vh, alignSelf: 'center'}}>
                        <View style={{flexDirection: 'column'}}>
                        <MyButton1 wysokosc={7*vh} szerokosc={55*vw} rozmiarCzcionki={5*vw} tekst={'Zapisz'} funkcja={()=>{console.log('zapisano')}} />
                        <MyButton1 wysokosc={7*vh} szerokosc={55*vw} rozmiarCzcionki={5*vw} tekst={'Udostępnij'} funkcja={()=>{udostepnij(props.idNotatki)}} />
                        <MyButton1 wysokosc={7*vh} szerokosc={55*vw} rozmiarCzcionki={5*vw} tekst={'Polub'} funkcja={()=>{console.log('zapisano')}} />
                        <MyButton1 wysokosc={7*vh} szerokosc={55*vw} rozmiarCzcionki={5*vw} tekst={'Zgłoś notatkę'} funkcja={()=>{console.log('zapisano')}} />
                        </View>
                    </View>

                    
                </Pressable>
            </Modal>

            <Modal 
            animationType="fade"
            transparent={true}
            visible={showShare}
            onRequestClose={()=>{setShowShare(!showShare)}}
            >

                <Pressable style={[styles.anywhere, {backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}]} onPress={()=>{setShowShare(!showShare)}}>

                <View style={{width: 70*vw, height: 80*vw, backgroundColor: qrStyle ? 'rgb(0, 0, 0)' : 'white', justifyContent: 'center', alignItems: 'center'}}>

                    <TouchableOpacity onPress={()=>{setQrStyle(!qrStyle)}} activeOpacity={0.4}>
                        {qrStyle ? 
                        <QRCode gradientDirection={[0,0,1,0]} linearGradient={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} content={qrCodeLink}/>
                        : 
                        <QRCode  content={qrCodeLink}/>    
                        }
                    </TouchableOpacity> 
                    
                    <TouchableOpacity onPress={()=>{Clipboard.setStringAsync(qrCodeLink);setTemp('Skopiowano')}} activeOpacity={0.4}>
                        <Text style={{color: qrStyle ? 'white' : 'black', fontSize: 18}}>{temp}</Text>
                    </TouchableOpacity>
                </View>

                </Pressable>
            </Modal>

            


        </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <UpperTab/>
            <Image style={{width: 100*vw, height: 100*vh, position: 'absolute', opacity: 0.15, zIndex: -100}} source={require('../assets/notedBg.png')}></Image>

            <TouchableOpacity activeOpacity={0.3} style={styles.przyciskDodawania} onPress={()=>{navigation.navigate('dodajNotatke'); }}>
            <Gradient1/>
            <Image style={styles.plus1} source={require('../assets/newIcons/spinacz.png')}></Image>
            </TouchableOpacity>

        <ScrollView>
        
            <View style={styles.pasek1}>
                <Text style={styles.polecaniNotatkowicze}>Polecani Notatkowicze</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 2*vh}}>
                <Polecany1 nazwa={polecany1.nazwa} zdjecie={polecany1.image} email={polecany1.email}/>
                <Polecany2 nazwa={polecany2.nazwa} zdjecie={polecany2.image} email={polecany2.email}/>
                <Polecany3 nazwa={polecany3.nazwa} zdjecie={polecany3.image} email={polecany3.email}/>
                </View>
            </View>

            <View style={styles.pasek2}>
                <Text style={styles.notatkiObserwowanych}>Notatki od obserwowanych użytkowników</Text>
                <FlatList 
                    style={{marginTop: 1.5*vh}}
                    horizontal={true} 
                    data={notatkiObserwowanych}
                    renderItem={({item})=> <Notatka zdjecie={item.zdjecie} tytul={item.tytul} autor={item.autor} 
                    polubienia={item.polubienia} czyPolubione={item.czyPolubione} idNotatki={item.idNotatki} 
                    czyZapisane={item.czyZapisane} email={item.email} />}
                />
            </View>

            <View style={styles.pasek3}>
                <Text style={styles.notatkiObserwowanych}>Notatki z obserwowanych przedmiotów</Text>
                <ScrollView horizontal={true}>

                </ScrollView>
            </View>

            <View style={styles.pasek4}>
                <Text style={styles.notatkiObserwowanych}>Ostatnio przeglądane notatki</Text>
                <ScrollView horizontal={true}>

                </ScrollView>
            </View>
        
        </ScrollView>

    </SafeAreaView>
            
    );
}

function Gradient1(){
    return(
        <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={{width: 100 * vw, height: 200, borderTopLeftRadius: 5 * vw, borderTopRightRadius: 5 * vw}} />
    )
}

function Gradient2(){
    return(
        <View>
        <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={{width: 100 * vw, height: 100 * vh, marginTop: -6 * vh, borderBottomLeftRadius: 5 * vw, borderBottomRightRadius: 5 * vw}} />
        </View>
    )
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
        borderColor: 'white'
    },
    tekst2: {
        fontSize: 7 * vw,
        alignSelf: 'center',
        color: 'white'
    },
    pasek1:{
        marginTop: 2*vh,
        height: 25 * vh, 
        width: 100*vw, 
    }, 
    polecaniNotatkowicze:{
        alignSelf: 'center', 
        color: 'rgb(220,220,220)', 
        fontSize: 2.5 * vh
    }, 
    polecany:{
        width: 27*vw, 
        height: 35*vw, 
        borderRadius:4*vw, 
    }, 
    pasek2:{
        borderTopWidth: 1, 
        borderTopColor: 'rgb(220,220,220)', 
        height: 33*vh
    }, 
    notatkiObserwowanych:{
        color: 'rgb(220,220,220)', 
        fontSize: 2 * vh, 
        marginLeft: 3*vw
    }, 
    pasek3:{
        borderTopWidth: 1, 
        borderTopColor: 'rgb(220,220,220)', 
        height: 30*vh
    }, 
    pasek4:{
        borderTopWidth: 1, 
        borderTopColor: 'rgb(220,220,220)', 
        height: 30*vh, 
        marginBottom: 20*vh
    }, 
    przyciskDodawania:{
        position: 'absolute', 
        backgroundColor: 'white', 
        width: 20 * vw, 
        height: 20 *vw,
        top: 79*vh,
        left: 75 * vw,
        borderColor: 'white', 
        borderRadius: 10 * vw, 
        alignItems: 'flex-end', 
        overflow: 'hidden', 
        zIndex: 5
    }, 
    plus1:{
        width: 9 * vw, 
        height: 12.2 * vw, 
        position: 'absolute', 
        left: 5.5 * vw, 
        top: 3.5 * vw, 
        transform: [{scale: 1.2}]   
    }, 
    notatkaThumbnail:{
        width: 55*vw, 
        height: 25*vh, 
        backgroundColor: 'rgba(0,0,0, 0.5)', 
        borderRadius: 3*vw,
        borderColor: 'rgb(180,180,180)', 
        borderWidth: 3, 
        margin: 2*vw
    }, 
    anywhere:{
        width: 100 * vw, 
        height: 100 * vh, 
        //backgroundColor: 'rgba(255, 255, 255, 0.4)', 

    },
    
});
