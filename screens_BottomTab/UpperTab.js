import { StyleSheet, Text, View, Dimensions, Alert, Image, Pressable, Modal, Platform, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;
import { LinearGradient as GradientExpo } from 'expo-linear-gradient';
import MyButton1 from '../components/myButton1';
import * as Haptics from 'expo-haptics';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UpperTab({ navigation }) {

    const [holdacc, setholdacc] = useState(false);
    const [holdmess, setholdmess] = useState(false);

    const [wartosc, setWartosc] = useState('');

    const[profilePicture, setprofilePicture] = useState('');

    const[isDefaultProfilePicture, setDefaultProfilePicture] = useState(false); 

    const [czySzuka, setSzuka] = useState(false);
    const widocznosc = useRef(new Animated.Value(1)).current;
    
    useEffect(()=>{
        let headers = {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }; 

        AsyncStorage.getItem('profilePicture')
            .then(value => {
                if (value != null) {
                    setprofilePicture(value)
                    if(value == 'notedImages/defaultUser.png'){
                        setDefaultProfilePicture(true);
                    }
                }
                else {
                    Alert.alert('Uwaga', 'Zostałeś wylogowany');
                }
            })
        
        const unsubscribe = navigation.addListener('focus', () => {
                AsyncStorage.getItem('profilePicture')
                .then(value => {
                    if (value != null) {
                        setprofilePicture(value)
                        if(value == 'notedImages/defaultUser.png'){
                            setDefaultProfilePicture(true);
                        }
                    }
                    else {
                        Alert.alert('Uwaga', 'Zostałeś wylogowany');
                    }
                })
            });
        
            
        return unsubscribe;

        
            
    }, [navigation])


    function obnizWidocznosc(){
        Animated.timing(widocznosc, {
            toValue: 0, 
            duration: 300, 
            useNativeDriver: false
        }).start();
        setTimeout(()=>{setSzuka(true)}, 300)
    }

    function powrocWidocznosc(){
        Animated.timing(widocznosc, {
            toValue: 1, 
            duration: 300, 
            useNativeDriver: false
        }).start();
        setTimeout(()=>{setSzuka(!czySzuka)}, 300)
    }

    navigation = useNavigation();

    function doUstawien(){
        navigation.navigate('kontoUzytkownika')
    }

    function wyloguj() {
        try {
            AsyncStorage.clear();
            navigation.navigate('powitalny')
        } catch (error) {
            alert(error);
        }
    }
    
    return (
    <View style={[styles.container, {marginTop: Platform.OS == 'android' ? 5 * vh : 0}]}>
        <Gradient/>
        <Pressable onLongPress={()=>{setholdacc(true); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)}} onPress={()=>{doUstawien()}} style={styles.mojeKonto}><Image onError={({ nativeEvent: {error} }) => console.log(error)} style={styles.userIcon} source={{uri: ("https://noted.com.pl/" + profilePicture)}}/></Pressable>

        <View style={styles.szukajka}>
            <Animated.Image style={{width: 7*vw, height: 7*vw, top: 1*vw, left: 2*vw, tintColor: 'rgb(164, 154, 246)', position: 'absolute', opacity: widocznosc}} source={require('../assets/newIcons/szukaj.png')}></Animated.Image>
            <TextInput onPressIn={()=>{obnizWidocznosc()}} returnKeyType='search' onEndEditing={()=>{alert(wartosc); powrocWidocznosc()}} onChangeText={(val)=>{setWartosc(val)}} placeholderTextColor={'rgb(164, 154, 246)'} style={styles.szukajka1} placeholder={czySzuka ? 'Szukaj...' : ''}></TextInput>
        </View>

        <Pressable onPress={()=>{doPowiadomien()}} style={styles.powiadomienia}><Image style={styles.userIcon} source={require('../assets/notify.png')}/></Pressable>
        
        <Modal 
        animationType="fade"
        transparent={true}
        visible={holdacc}
        onRequestClose={()=>{setholdacc(!holdacc)}}
        >
            <Pressable style={styles.anywhere} onPress={()=>{setholdacc(!holdacc)}}>

                <View style={[styles.anywhere, {opacity: 0.3}]}>
                <Gradient1/>
                </View>

                <View style={styles.modalButton}>
                    <MyButton1 marginTop={0} funkcja={()=>{setholdacc(!holdacc); wyloguj()}} rozmiarCzcionki={4 * vw} wysokosc={5 * vh} szerokosc={25 * vw} tekst={'Wyloguj'}></MyButton1>

                </View>

                
            </Pressable>
        </Modal>

    </View>
            
    );
}



function Gradient(){
    return(
        <View>
        <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={{width: 100 * vw, height: 12 * vh, marginTop: -6 * vh, borderBottomLeftRadius: 5 * vw, borderBottomRightRadius: 5 * vw}} />
        </View>
    )
}

function Gradient1(){
    return(
        <View>
        <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={{width: 100 * vw, height: 100 * vh, marginTop: -6 * vh, borderBottomLeftRadius: 5 * vw, borderBottomRightRadius: 5 * vw}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 100 * vw,
        height: 6 * vh,
        backgroundColor: 'rgb(16, 16, 16)',
    },
    mojeKonto:{
        width: 20 * vw, 
        height: 3 * vh, 
        position: 'absolute', 
        alignItems: 'center', 
        
        shadowColor: "rgb(0,0,0)",
        shadowOffset:{
            width: 2, 
            height: 1
        }, 
        shadowOpacity: 0.8, 
        //shadowRadius: 5*vw
    }, 
    userIcon:{
        width: 10 * vw, 
        height: 10 * vw, 
        justifyContent: 'center', 
        borderRadius: 5 * vw, 
    }, 
    powiadomienia:{
        width: 20 * vw, 
        height: 3 * vh, 
        position: 'absolute', 
        alignItems: 'center', 
        right: 4 * vw
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
        left: 8 * vw, 
        top: 11 * vh, 
        position: 'absolute'
        
    }, 
    szukajka:{
        width: 55*vw, 
        backgroundColor: 'rgb(16, 16, 16)', 
        height: 10*vw, 
        position: 'absolute', 
        alignSelf:'center', 
        borderRadius: 2*vw, 

        borderWidth: 1, 
        borderColor: 'rgb(200, 200, 200)',
        shadowColor: "rgb(0,0,0)",
        shadowOffset:{
            width: 2, 
            height: 1
        }, 
        shadowOpacity: 0.4, 
        
    }, 
    szukajka1:{
        width: '80%', 
        height: '100%', 
        alignSelf: 'center', 
        color: 'rgb(242, 105, 255)', 
        marginLeft: '10%'
    }
    
});
