/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import appEmitter from './src/utils/appEmitter';
import { createStackNavigator } from '@react-navigation/stack';
import Register from './src/screens/Register';
import { auth } from './src/database/firebaseConnection';
import { Providers } from './src/providers';
import InitialPage from './src/screens/InitialPage';
import HomeRoute from './src/router/HomeRoute';
import HomeScreen from './src/screens/HomeScreen';

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function App(): React.JSX.Element {

  const [isLogged, setIsLogged] = useState(false);

  appEmitter.on('doLogin', () => {
    setIsLogged(true);
  });
  
  return (
    <>
    <Providers>
      <NavigationContainer>
        {!isLogged && !Boolean(auth.currentUser?.uid) && (
          <Stack.Navigator initialRouteName="Início">
            <Stack.Screen name="Início" component={InitialPage} />
            <Stack.Screen name="Entrar" component={Login} />
            <Stack.Screen name="Cadastrar" component={Register} />
          </Stack.Navigator>
          
        )}
        {isLogged && Boolean(auth.currentUser?.uid) && (
          <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={HomeRoute} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        )}
        
      </NavigationContainer>
      </Providers>
    </>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
