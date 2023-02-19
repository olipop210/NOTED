import { StyleSheet, Dimensions, SafeAreaView, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

export default function Loading({ navigation }) {

    useEffect(() => {
        SprawdzZalogowanie();
    }, []);



    function SprawdzZalogowanie() {

        try {
            AsyncStorage.getItem('forgotEmail')
                .then(value=>{
                    if (value != null) {
                        setTimeout(() => { navigation.navigate('resetowanieHasla2') }, 500)
                    }
                });
            AsyncStorage.getItem('loggedEmail')
                .then(value => {
                    if (value != null) {
                        setTimeout(() => { navigation.navigate('glowny') }, 500)
                    }
                    else {
                        setTimeout(() => { navigation.navigate('powitalny') }, 500)
                    }
                })
        } catch (error) {
            alert(error);
        }


    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require('../media/NotedIcon.png')}></Image>
            <ActivityIndicator size={'large'} color={'rgb(164, 154, 246)'}></ActivityIndicator>
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
});
