import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Powitalny from './screens/Powitalny.js';
import Loading from './screens/Loading.js';
import Logowanie from './screens/Login.js';
import Rejestracja from './screens/Register.js';
import Main from './screens/Main.js';
import Weryfikacja from './screens/Verify.js';
import ForgotPass1 from './screens/ForgotPass1.js';
import ForgotPass2 from './screens/ForgotPass2.js';
import ForgotPass3 from './screens/ForgotPass3.js';
import ChooseLevel from './screens/ChooseLevel.js';
import ChooseSubjects from './screens/ChooseSubjects.js';
import NewMain from './screens_BottomTab/NewMain.js';
import UserAccount from './screens_BottomTab/UserAccount.js';
import OpenAccount from './screens/OpenAccount.js';
import AddNote from './screens_BottomTab/AddNote.js';
import OpenNote from './screens/OpenNote.js';

const vw = Dimensions.get('screen').width * 0.01;
const vh = Dimensions.get('screen').height * 0.01;

const Stack = createStackNavigator();
export default function App() {

    const [userEmail, setEmail] = useState('');
    const [userNick, setNick] = useState('');

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='loading'
                    component={Loading}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='powitalny'
                    component={Powitalny}
                    options={{ header: () => null, gestureEnabled: false }}
                />
                <Stack.Screen
                    name='logowanie'
                    component={Logowanie}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='rejestracja'
                    component={Rejestracja}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='glownyStary'
                    component={Main}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='weryfikacja'
                    component={Weryfikacja}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='resetowanieHasla1'
                    component={ForgotPass1}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='resetowanieHasla2'
                    component={ForgotPass2}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='ResetowanieHasla3'
                    component={ForgotPass3}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='wyborPoziomu'
                    component={ChooseLevel}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='wyborPrzedmiotow'
                    component={ChooseSubjects}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='glowny'
                    component={NewMain}
                    options={{ header: () => null, gestureEnabled: false }}
                />
                <Stack.Screen
                    name='kontoUzytkownika'
                    component={UserAccount}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='otworzProfil'
                    component={OpenAccount}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='dodajNotatke'
                    component={AddNote}
                    options={{ header: () => null }}
                />
                <Stack.Screen
                    name='otworzNotatke'
                    component={OpenNote}
                    options={{ header: () => null }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {

    },
});
