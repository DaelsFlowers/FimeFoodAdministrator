import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import firebase from "firebase/app"
import "firebase/auth"


//Screens
import LoginScreen from './Login/LoginScreen';
import RegisterScreen from './Login/RegisterScreen';
import HomeSeller from './Screens/Seller/HomeSeller';

import PerfilSeller from "./Screens/Seller/PerfilSeller";

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const firebaseConfig = {
    apiKey: "AIzaSyBj_JR3XjrOBbQT8O3jLSu1x7T4Am0oWtM",
    authDomain: "fimefoodadministrator.firebaseapp.com",
    projectId: "fimefoodadministrator",
    storageBucket: "fimefoodadministrator.appspot.com",
    messagingSenderId: "500201941617",
    appId: "1:500201941617:web:c00329a908ea1c88e0c9d0"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }


  firebase.auth().onAuthStateChanged((user) => {
    if (user != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  })


  return (
    <NavigationContainer>
      {isLoggedIn ? <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeSeller} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={PerfilSeller} options={{ headerShown: false }} />
      </Stack.Navigator> :
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>}
    </NavigationContainer>
  )
}

export default App

