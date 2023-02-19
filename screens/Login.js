import { StyleSheet, Text, View, Dimensions, SafeAreaView, Image, Alert } from 'react-native';
import { useState,useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton1 from '../components/myButton1';
import MyInput1 from '../components/myInput1';
import MyButton2 from '../components/myButton2';

//powiadomienia
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

//testowe powiadomienia
Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

export default function Logowanie({ navigation }) {

    //testowe powiadomienia
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    

    const [email, setEmail] = useState('');
    const [haslo, setHaslo] = useState('');

    async function zaloguj() {

        

        let LINK ="https://noted.com.pl/"

        

        var paswd = /^(?=.*[0-9])(?=.*[!@_#$%^.&*])[a-zA-Z0-9!@_#$%^.&*]{8,32}$/;

        if (email.length == 0) {
            Alert.alert('Błąd', 'Wpisz adres E-mail');
            setColorInput1('rgb(200, 0, 0)');
        }
        else if (email.indexOf('@') == -1) {
            Alert.alert('Błąd', 'Wpisz poprawny adres E-mail');
            setColorInput1('rgb(200, 0, 0)');
        }
        else if (!(haslo.match(paswd))) {
            Alert.alert('Błąd', 'wpisz poprawne hasło');
            setColorInput2('rgb(200, 0, 0)');
        }
        else { //walidacja przeszla, przysylanie danych
            var link = LINK + "notedMobile/Login/Login.php"; 
            //do testow po prostu podmien sobie link do php co sobie robisz na localhoscie w xampie

                var headers = {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json',
                }; 
                var Data ={ 
                    Email: email, 
                    Password: haslo
                };
                await fetch(link, {
                    method: 'POST', 
                    headers: headers, 
                    body: JSON.stringify(Data)
                })

                .then((response)=>response.text()) 
                .then((response)=>{ 
                    //response = JSON.parse(String(response));
                    let tmp = response.indexOf('Status') + 8; //8 znaków po od litery 'S' jest liczba
                    let responseStatus = parseInt(response.charAt(tmp));

                    tmp = response.indexOf('Nick') + 6;
                    let qt1 = response.indexOf('"', tmp);
                    let qt2 = response.indexOf('"', qt1+1);
                    let responseNick = response.slice(qt1 + 1, qt2);

                    tmp = response.indexOf('Prof') + 6;
                    qt1 = response.indexOf('"', tmp);
                    qt2 = response.indexOf('"', qt1+1);
                    let responseProf = response.slice(qt1 + 1, qt2);
                    responseProf = responseProf.replace('\\', '');
                    alert(responseProf);

                    if(responseStatus == 1){
                    try {
                        AsyncStorage.setItem('loggedEmail', email); 
                        AsyncStorage.setItem('loggedNick', responseNick)
                        AsyncStorage.setItem('profilePicture', responseProf)

                         //testowe powiadomienia
                        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
                        //alert(expoPushToken);

                        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                        setNotification(notification);
                        });

                        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                        console.log(response);
                        });
                        navigation.navigate('glowny');
                        return () => {
                            Notifications.removeNotificationSubscription(notificationListener.current);
                            Notifications.removeNotificationSubscription(responseListener.current);
                        };



                        } catch (error) {
    
                            alert(error);
                        }
                  }


                })
                .catch((error)=>{ 
                  alert("Error Occured " + error);
                });

                
        }
    }

    function zapomnialHasla(){
        navigation.navigate('resetowanieHasla1');


    }


    return (
        <SafeAreaView style={styles.container}>
                        <Image   style={{width: 100*vw, height: 100*vh, position: 'absolute', opacity: 0.15, zIndex: -100}} source={require('../assets/notedBg.png')}></Image>
            <Text style={styles.tekst1}>Zaloguj się</Text>
            <Image style={styles.logo} source={require('../media/NotedIcon.png')}></Image>
            <MyInput1 placeholder={'E-mail'} odbiorTekstu={(dane) =>{setEmail(dane)}}  rozmiarCzcionki={3 * vh} szerokosc={60 * vw} wysokosc={6 * vh} ></MyInput1>
            <MyInput1 haslo={true} placeholder={'Hasło'} odbiorTekstu={(dane) => {setHaslo(dane)}} rozmiarCzcionki={3 * vh} szerokosc={60 * vw} wysokosc={6 * vh}></MyInput1>
            <View style={{marginTop: 5 * vh}}></View>
            <MyButton1 rozmiarCzcionki={7 * vw} wysokosc={10*vh} szerokosc={60 * vw} funkcja={zaloguj} tekst={'Zaloguj się'}></MyButton1>
            <MyButton2 marginTop={3 * vh} funkcja={zapomnialHasla} rozmiarCzcionki={4 * vw} wysokosc={5 * vh} szerokosc={40 * vw} tekst={'Nie pamiętam hasła'}></MyButton2>
        </SafeAreaView>
    );

    async function registerForPushNotificationsAsync() {

        
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        
        if (Device.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
    
        var jeden = token.indexOf('[');
        var dwa = token.indexOf(']');
        var x = token.slice(jeden + 1, dwa);
        var headers = {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
        }; 
        alert(email);
        var Data ={ 
            Email: email, 
            Tokenik: x
        };
        AsyncStorage.setItem('notificationToken', x);
        console.log(x);
    
    
        await fetch('https://noted.com.pl/notedMobile/notifications/addToken.php', {
            method: 'POST', 
            headers: headers, 
            body: JSON.stringify(Data)
        })
        .then((response)=>response.text()) 
        .then((response)=>{ 
            //alert(response);
            /*
            let tmp = response.indexOf('Status') + 8; //8 znaków po od litery 'S' jest liczba
            let responseStatus = parseInt(response.charAt(tmp));
            if(responseStatus == 1){
                alert('token powiadomienia wysłany');
            }
            */
        })
        .catch((error)=>{ 
            alert("Error Occured " + error);
          });
    
    
        return token;
      }
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
        borderColor: 'rgb(164, 154, 246)'
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

    },
});
