import { StyleSheet, View, Dimensions, Alert, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import Home from './Home';
import Scrolling from './Scrolling';
import Liked from './Liked';
import Saved from './Saved';


const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;
import { LinearGradient as GradientExpo } from 'expo-linear-gradient';
import AddNote from './AddNote';



const Tab = createBottomTabNavigator();

export default function NewMain({ navigation }) {

    const [czyDodawanie, setDodawanie] = useState('flex');
    const [email, setEmail] = useState('');


    

    useEffect(() =>  {
        SprawdzZalogowanie();
        setDodawanie('flex');
    }, [navigation]);

    


    function SprawdzZalogowanie() {
        
        try {
            AsyncStorage.getItem('loggedEmail')
                .then(value => {
                    if (value != null) {
                        AsyncStorage.removeItem('forgotEmail');
                        AsyncStorage.removeItem('verifyEmail');
                        setEmail(value);
                    }
                    else {
                        Alert.alert('Uwaga', 'Zostałeś wylogowany');
                    }
                })

            
        } catch (error) {
            alert(error);
        }
    }


    return (
            <Tab.Navigator 
                screenOptions={{
                    tabBarStyle: { margin: 0, borderTopWidth: 0, borderTopColor: 'rgb(164, 154, 246)', position: 'absolute'}, 
                    header: () => null, 
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'black',
                    tabBarBackground: ()=>(<Gradient/>),
                    }}
                    listeners={{
                        tabPress:()=>{
                            setDodawanie('flex');
                        },
                    }}
                    >

                <Tab.Screen options={{
                    tabBarLabel: 'Główna', 
                    tabBarIcon: ({size, focused, color})=>{
                        return(
                            <Image style={{width: size, height: size, tintColor: focused? 'rgb(255,255,255)' : 'rgb(0,0,0)'}} source={require('../assets/newIcons/domek.png')}></Image>
                        )} }} 
                name='Home' component={Home}/>

                <Tab.Screen options={{
                    tabBarLabel: 'Przeglądaj',
                    tabBarIcon: ({size, focused, color})=>{
                        return (
                            <Image style={{width: size, height: size, tintColor: focused? 'rgb(255,255,255)' : 'rgb(0,0,0)'}} source={require('../assets/newIcons/domek.png')}></Image>
                        )}}} 
                    name='Scrolling' component={Scrolling}/>

                <Tab.Screen options={{
                    tabBarLabel: 'Polubione', 
                    tabBarIcon: ({size, focused, color})=>{
                    return (
                        <Image style={{width: size, height: size, tintColor: focused? 'rgb(255,255,255)' : 'rgb(0,0,0)'}} source={require('../assets/newIcons/serce.png')}></Image>
                    )}}}
                name='Liked' component={Liked}/>

                <Tab.Screen options={{
                    tabBarLabel: 'Zapisane',
                    tabBarIcon: ({size, focused, color})=>{
                        return (
                            <Image style={{width: size, height: size, tintColor: focused? 'rgb(255,255,255)' : 'rgb(0,0,0)'}} source={require('../assets/newIcons/zapisane2.png')}></Image>
                        )}}}
                name='Saved' component={Saved}/>


                
            </Tab.Navigator>
            
    );

    
    
}

/*

<Tab.Screen name='AddingNote' component={AddNote} options={({navigation})=>({
    tabBarButton:(props)=>(
        <Pressable style={[styles.przyciskDodawania, {display: czyDodawanie}]} onPress={()=>{ navigation.navigate('AddingNote'); }}>
            <Gradient1/>
            <Image style={styles.plus1} source={require('../assets/newIcons/spinacz.png')}></Image>
        </Pressable>
    ),
})}/> 

*/

function Gradient(){
    return(
        <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={{width: 100 * vw, height: 200, borderTopLeftRadius: 5 * vw, borderTopRightRadius: 5 * vw}} />
    )
}

function Gradient1(){
    return(
        <GradientExpo start={[0, 0]} end={[1, 0]} colors={['rgb(164, 154, 246)', "rgb(242, 105, 255)"]} style={{width: 100 * vw, height: 200, borderTopLeftRadius: 5 * vw, borderTopRightRadius: 5 * vw}} />
    )
}





//'rgb(222, 191, 235)', "rgb(242, 105, 255)"
const styles = StyleSheet.create({
    przyciskDodawania:{
        position: 'absolute', 
        backgroundColor: 'white', 
        width: 20 * vw, 
        height: 20 *vw,
        top: -10 * vh - 5 * vw,
        left: 75 * vw,
        borderColor: 'white', 
        borderRadius: 10 * vw, 
        alignItems: 'flex-end', 
        overflow: 'hidden', 
    }, 
    plus1:{
        width: 9 * vw, 
        height: 12.2 * vw, 
        position: 'absolute', 
        left: 5.5 * vw, 
        top: 3.5 * vw, 
        transform: [{scale: 1.2}]   
    }
});

