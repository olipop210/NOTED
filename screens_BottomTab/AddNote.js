import { StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, Image, FlatList, TouchableOpacity, Modal, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;
import MyButton2 from '../components/myButton2';
import * as ImagePicker from 'expo-image-picker'
import MyButton1 from '../components/myButton1';
import MyInput1 from '../components/myInput1'
import SelectDropdown from 'react-native-select-dropdown';

export default function AddNote({ navigation }) {



    const[photoPath, setPhotoPath] = useState("https://noted.com.pl/" + 'notedImages/placeholderImage.png')
    const[tytul, setTytul] = useState('')
    
    const klasy=['1 szkoły podstawowej', '2 szkoły podstawowej', '3 szkoły podstawowej', '4 szkoły podstawowej', '5 szkoły podstawowej', '6 szkoły podstawowej', '7 szkoły podstawowej', '8 szkoły podstawowej', '1 szkoły średniej', '2 szkoły średniej', '3 szkoły średniej', '4 szkoły średniej']
    var przedmioty=[];
    if(true){
        przedmioty.push('Polski');
    }
    if (true) przedmioty.push('Angielski');
    if (true) przedmioty.push('Niemiecki');
    if (true) przedmioty.push('Matematyka');
    if(true) przedmioty.push('Informatyka');
    if(true) przedmioty.push('Historia');
    if(true) przedmioty.push('WOS');
    if(true) przedmioty.push('Muzyka');
    if(true) przedmioty.push('Geografia');
    if(true) przedmioty.push('Biologia'); 
    if(true) przedmioty.push('Chemia');
    if (true) przedmioty.push('Fizyka');
    const [klasaID, setKlasaID] = useState(0);
    const [klasa, setKlasa] = useState('Wybierz klasę')
    const [przedmiot, setPrzedmiot] = useState('Wybierz przedmiot')
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [email, setEmail] = useState('');
    const [isSendindImages, setSendingImages] = useState(false);

    const DefaultData = [{uri: 'https://noted.com.pl/notedImages/placeholderImage.png', base64: '', identyfikator: 0}];

    const [tablicaDanych, aktualizujDane] = useState([{uri: 'https://noted.com.pl/notedImages/placeholderImage.png', base64: '', identyfikator: 0}]);


    useEffect(() => {
        SprawdzZalogowanie();

        const unsubscribe = navigation.addListener('focus',async () => {
            if(tablicaDanych[0].uri == 'https://noted.com.pl/notedImages/placeholderImage.png'){
                //TODO
            }
        });
    
        
        return unsubscribe;
        
    }, [navigation]);

    function SprawdzZalogowanie() {
        try {
            AsyncStorage.getItem('loggedEmail')
                .then(value => {
                    if (value != null) {
                        AsyncStorage.removeItem('forgotEmail');
                        AsyncStorage.removeItem('verifyEmail');
                        setEmail(value)
                    }
                    else {
                        Alert.alert('Uwaga', 'Zostałeś wylogowany');
                    }
                })
        } catch (error) {
            alert(error);
        }
    }

    async function dodajNotatke(){
        if(tytul.length > 4){
            if(klasaID != 0){
                if(przedmiot != 'Wybierz przedmiot'){
                    if(tablicaDanych.length > 1){

                        setSendingImages(true);
                        
                        aktualizujDane( tablicaDanych.filter(a=>a.uri != 'https://noted.com.pl/notedImages/placeholderImage.png')); //usun z kopii placeholder na koncu, jesli wystepuje

                        /*

                        aktualizujDane(tablicaDanych.map((element)=>{
                            element.base64 = 'data:image/jpeg;base64,' + element.base64 //dodaj odpowiedni znacznik do base64
                        }))

                        */

                        

                        let headers={
                            'Accept': 'application/json', 
                            'Content-Type': 'application/json',
                        }
                        let data = {
                            email: email, 
                            tytul: tytul, 
                            klasa: klasaID, 
                            przedmiot: przedmiot, 
                            zdjecia: tablicaDanych //nie zgadniesz, ale to tablica
                        }

                        await fetch('https://noted.com.pl/notedMobile/notes/notesadd.php', {
                            method: 'POST', 
                            headers: headers, 
                            body: JSON.stringify(data)
                        })
                        .then((response)=>response.json()) 
                        .then((response)=>{ 
                            console.log(response)

                            if(response.statusNotatki == 1){
                                
                                aktualizujDane(DefaultData);
                                setSendingImages(false)
                                navigation.navigate('Home');
                            }

                            
                        })
                        .catch((error)=>{ 
                            alert("Error Occured " + error);
                        });
                        




                    }
                    else{
                        Alert.alert('Błąd', 'Najpierw dodaj zdjęcia do notatki')
                    }

                }
                else{
                    Alert.alert('Błąd', 'Wybierz przedmiot')
                }
            }
            else{
                Alert.alert('Błąd','Wybierz klasę');
            }
        }
        else{
            Alert.alert('Błąd', 'Tytuł musi mieć długość conajmniej 5 znaków');
        }
    }

    async function pickImage(identyfikator){
        requestPermission();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.7,
            allowsMultipleSelection: false, 
            selectionLimit: 5,
            base64: true, 
            aspect: [1, 1], 
          });


      
      
          if (!result.canceled) {

            if(result.uri == null){
                console.log('puste')
            }
            else{
                if(tablicaDanych[identyfikator].uri == 'https://noted.com.pl/notedImages/placeholderImage.png'){

                    aktualizujDane(tablicaDanych.filter(a=> a.identyfikator != identyfikator));
                    setPhotoPath(result.uri);
                    
                    aktualizujDane(arr=>[...arr, {uri: result.uri, base64: result.base64, identyfikator: tablicaDanych.length - 1}]);

                    if(tablicaDanych.length < 5){
                        aktualizujDane(arr=>[...arr, {uri: 'https://noted.com.pl/notedImages/placeholderImage.png', base64: '', identyfikator: tablicaDanych.length}])
                    }


                }
                else{
                    let nowe = tablicaDanych.map((element, i)=>{
                        if(i === identyfikator){
                            console.log('chuj');
                            return {uri: result.uri, base64: result.base64, identyfikator: i}
                            
                        }
                        else{
                            return element
                        }
                    })
                    aktualizujDane(nowe);
                }
                
            }

            tablicaDanych.forEach(element => {
                console.log(element.uri);
            });

          }

          //console.log(tablicaDanych);
    }

    /*
        <View style={styles.horizontalBox}>
            <Image style={styles.podgladNotatki} source={{uri: (photoPath)}}></Image>
            <View style={{marginLeft: 5*vw}}></View>
            
            <MyButton1 rozmiarCzcionki={3.5 * vw} szerokosc={40*vw} wysokosc={5 * vh} tekst={'Wybierz zdjęcie'} funkcja={()=>{pickImage()}} ></MyButton1>
        </View>
    */

    const Zdjecie = (props)=>(
        <TouchableOpacity style={{width: 40*vw, height: 40*vw, marginRight: 5*vw}}  activeOpacity={0.3} onPress={()=>{pickImage(props.identyfikator)}}>
        <Image style={styles.podgladNotatki} source={{uri: (props.uri)}}></Image>
        </TouchableOpacity>
    )





    const ref1 = useRef();
    const ref2 = useRef();
    return (
    <SafeAreaView style={styles.container}>
        <MyButton2 marginTop={1 * vh} funkcja={()=>{}} rozmiarCzcionki={8 * vw} wysokosc={10 * vh} szerokosc={80 * vw} tekst={'Dodaj notatkę'}></MyButton2>
        
        <FlatList 
            horizontal={true}
            data={tablicaDanych}
            renderItem={({item})=> <Zdjecie identyfikator={item.identyfikator} uri={item.uri}/>}
            style={{flexGrow: 0, marginLeft: 5*vw, marginRight: 5*vw, marginTop: 3*vh, paddingBottom: 2*vh}}
            
        />


        <MyInput1 placeholder={'Tytuł notatki'} odbiorTekstu={(tytul) =>{setTytul(tytul)}}  rozmiarCzcionki={3 * vh} szerokosc={80 * vw} wysokosc={6 * vh} ></MyInput1>

        <SelectDropdown ref={ref1}
        data={klasy}
        onSelect={(selectedItem, index) => {
            setKlasaID(index+1);
            setKlasa(selectedItem);
        }}
        defaultButtonText={'Wybierz klasę'}
        buttonStyle={styles.dropDown}
        rowStyle={styles.dropDown1}
        dropdownStyle={{marginLeft: -10*vw, borderRadius: 5*vw, backgroundColor: 'rgb(16, 16, 16)', width: 80 *vw, alignContent: 'center'}}
        rowTextStyle={{color: 'rgb(164, 154, 246)'}}
        />
        <View style={styles.dropDown2}>
        <MyButton1 rozmiarCzcionki={4.5 * vw} szerokosc={80*vw} wysokosc={8 * vh} tekst={klasa} funkcja={()=>{ref1.current.openDropdown()}} ></MyButton1>
        </View>

        <SelectDropdown ref={ref2}
        data={przedmioty}
        onSelect={(selectedItem, index) => {
            setPrzedmiot(selectedItem)
        }}
        defaultButtonText={'Wybierz klasę'}
        buttonStyle={styles.dropDown}
        rowStyle={styles.dropDown1}
        dropdownStyle={{marginLeft: -10*vw, borderRadius: 5*vw, backgroundColor: 'rgb(16, 16, 16)', width: 80 *vw, alignContent: 'center'}}
        rowTextStyle={{color: 'rgb(164, 154, 246)'}}
        />
        <View style={styles.dropDown2}>
        <MyButton1 rozmiarCzcionki={4.5 * vw} szerokosc={80*vw} wysokosc={8 * vh} tekst={przedmiot} funkcja={()=>{ref2.current.openDropdown()}} ></MyButton1>
        </View>
        <View style={{marginTop: -2*vh}}>
        <MyButton1 rozmiarCzcionki={4.5 * vw} szerokosc={50*vw} wysokosc={8 * vh} tekst={'Dodaj notatkę'} funkcja={()=>{dodajNotatke()}} ></MyButton1>
        </View>


        <Modal 
            animationType="fade"
            transparent={true}
            visible={isSendindImages}
            onRequestClose={()=>{setSendingImages(!isSendindImages)}}
            >

                <Pressable style={[styles.anywhere, {backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}]} onPress={()=>{setSendingImages(!isSendindImages)}}>

                <View style={{width: 60*vw, height: 60*vw,  justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator style={{transform: [{scale: 2}]}} size={'large'} color={'rgb(164, 154, 246)'}/>
                    
                </View>

                </Pressable>
            </Modal>

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
    podgladNotatki:{
        width: 40 * vw, 
        height: 40 * vw, 
    }, 
    dropDown:{
        width: 40*vw, 
        height: 5*vh,
        left: 20*vw,
        top: 3*vh
    }, 
    dropDown1:{
        textAlign: 'center', 
        width: 80 * vw
    }, 
    dropDown2:{
        position: 'relative', 
        top: -4*vh, 
        
    }, 
    anywhere:{
        width: 100 * vw, 
        height: 100 * vh, 
        //backgroundColor: 'rgba(255, 255, 255, 0.4)', 

    },
    
});
