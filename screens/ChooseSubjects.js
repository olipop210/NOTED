import { StyleSheet, Text, View, Dimensions, SafeAreaView, Alert, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import MyButton1 from '../components/myButton1';
import { ScrollView } from 'react-native-gesture-handler';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

export default function ChooseSubjects({ navigation }) {

    const [email, setEmail] = useState('');

    

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

    const [polski, setpolski] = useState(false);
    const [ang, setang] = useState(false);
    const [niem, setniem] = useState(false);
    const [mat, setmat] = useState(false);
    const [inf, setinf] = useState(false);
    const [his, sethis] = useState(false);
    const [wos, setwos] = useState(false);
    const [muz, setmuz] = useState(false);
    const [geo, setgeo] = useState(false);
    const [bio, setbio] = useState(false);
    const [chem, setchem] = useState(false);
    const [fiz, setfiz] = useState(false);

    async function wyslij(){



        var tab=[];
        if(polski){
            tab.push('Polski');
        }
        if (ang) tab.push('Angielski');
        if (niem) tab.push('Niemiecki');
        if (mat) tab.push('Matematyka');
        if(inf) tab.push('Informatyka');
        if(his) tab.push('Historia');
        if(wos) tab.push('WOS');
        if(muz) tab.push('Muzyka');
        if(geo) tab.push('Geografia');
        if(bio) tab.push('Biologia'); 
        if(chem) tab.push('Chemia');
        if (fiz) tab.push('Fizyka');

        if(tab.length < 1){
            Alert.alert('Uwaga', 'Wybierz co najmniej jeden przedmiot')
        }
        else{
            var link = String( "https://noted.com.pl/" + "notedMobile/schoolsubjects/subjects.php"); 
            //do testow po prostu podmien sobie link do php co sobie robisz na localhoscie w xampie

                var headers = {
                    'Accept': 'application/json', //nie mam pojecia co to
                    'Content-Type': 'application/json',
                }; 
                var Data ={ 
                    Email: email, //tych nazw po lewej bedziesz uzywac do odbierania danych w php
                    Subjects: tab
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
                            AsyncStorage.setItem('Przedmioty', tab.toString());
                            navigation.navigate('glowny');
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
            <Text style={styles.tekst1}>Wybierz przedmioty, które Cię interesują: </Text>
            <ScrollView>
                <View style={styles.flexRow}>
                    <Pressable onPress={()=>{setpolski(!polski)}} style={[styles.box1, {opacity: polski ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/pol.png')}></Image>
                        <Text style={styles.tekst2}>Jęxyk Polski</Text>
                    </Pressable>

                    <Pressable onPress={()=>{setang(!ang)}} style={[styles.box1, {opacity: ang ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/ang.png')}></Image>
                        <Text style={styles.tekst2}>Jężyk Angielski</Text>
                    </Pressable>

                    <Pressable onPress={()=>{setniem(!niem)}} style={[styles.box1, {opacity: niem ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/niem.png')}></Image>
                        <Text style={styles.tekst2}>Jężyk Niemiecki</Text>
                    </Pressable>
                </View>

                <View style={styles.flexRow}>
                    <Pressable onPress={()=>{setmat(!mat)}} style={[styles.box1, {opacity: mat ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/mat.png')}></Image>
                        <Text style={styles.tekst2}>Matematyka</Text>
                    </Pressable>
                    <Pressable onPress={()=>{setinf(!inf)}} style={[styles.box1, {opacity: inf ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/inf.png')}></Image>
                        <Text style={styles.tekst2}>Informatyka</Text>
                    </Pressable>
                    <Pressable onPress={()=>{sethis(!his)}} style={[styles.box1, {opacity: his ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/his.png')}></Image>
                        <Text style={styles.tekst2}>Historia</Text>
                    </Pressable>
                </View>

                <View style={styles.flexRow}>
                    <Pressable onPress={()=>{setwos(!wos)}} style={[styles.box1, {opacity: wos ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/wos.png')}></Image>
                        <Text style={styles.tekst2}>WOS</Text>
                    </Pressable>
                    <Pressable onPress={()=>{setmuz(!muz)}} style={[styles.box1, {opacity: muz ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/muz.png')}></Image>
                        <Text style={styles.tekst2}>Muzyka</Text>
                    </Pressable>
                    <Pressable onPress={()=>{setgeo(!geo)}} style={[styles.box1, {opacity: geo ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/geo.png')}></Image>
                        <Text style={styles.tekst2}>Geografia</Text>
                    </Pressable>
                </View>

                <View style={styles.flexRow}>
                    <Pressable onPress={()=>{setbio(!bio)}} style={[styles.box1, {opacity: bio ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/biol.png')}></Image>
                        <Text style={styles.tekst2}>Biologia</Text>
                    </Pressable>
                    <Pressable onPress={()=>{setchem(!chem)}} style={[styles.box1, {opacity: chem ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/chem.png')}></Image>
                        <Text style={styles.tekst2}>Chemia</Text>
                    </Pressable>
                    <Pressable onPress={()=>{setfiz(!fiz)}} style={[styles.box1, {opacity: fiz ?0.3 :1}]}>
                        <Image style={styles.zdjecie1} source={require('../assets/SubjectsIcons/fiz.png')}></Image>
                        <Text style={styles.tekst2}>Fizyka</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <MyButton1 funkcja={()=>{wyslij()}} wysokosc={10 * vh} szerokosc={60 * vw} tekst={'Dalej'} rozmiarCzcionki={8 * vw}></MyButton1>
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
        color: 'rgb(164, 154, 246)',
        fontSize: 30,
        alignSelf: 'center',
        paddingTop: 5 * vh, 
        marginBottom: 3 * vh, 
        marginLeft: 1.5 * vw
    },
    
    
    box1: {
        borderColor: 'rgb(164, 154, 246)',
        borderWidth: 3, 
        borderRadius: 3 * vw, 
        width: 33 * vw, 
        height: 37 * vw
    }, 
    flexRow:{
        flexDirection: 'row'
    }, 
    zdjecie1:{
        width: 30 * vw,
        height: 30 * vw
    }, 
    tekst2:{
        color: 'rgb(164, 154, 246)',
        textAlign: 'center'
    }
});
