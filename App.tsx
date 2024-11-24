/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import appEmitter from './src/utils/appEmitter';
import {createStackNavigator} from '@react-navigation/stack';
import Register from './src/screens/Register';
import {auth} from './src/database/firebaseConnection';
import {Providers} from './src/providers';
import InitialPage from './src/screens/InitialPage';
import HomeRoute from './src/router/HomeRoute';
import Calendar from './src/screens/Calendar';
import { Image } from 'react-native';
import { colors } from './src/utils/colors';

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
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'gray',
                tabBarInactiveTintColor: 'gray',
              }}>
              <Tab.Screen
                name="Home"
                component={HomeRoute}
                options={{
                  tabBarLabel: () => null,
                  tabBarIcon: () => (
                    <Image
                      source={require('./src/assets/images/home-icon.png')}  
                      style={{ width: 25, height: 25 }}           
                    />
                  ),
                  tabBarActiveBackgroundColor: colors.backgroundContainer,
                }}
              />
              <Tab.Screen
                name="Ciclo"
                component={Calendar}
                options={{
                  tabBarLabel: () => null,
                  tabBarIcon: () => (
                    <Image
                      source={require('./src/assets/images/calendar-icon.png')}  
                      style={{ width: 25, height: 25 }}           
                    />
                  ),
                  tabBarActiveBackgroundColor: colors.backgroundContainer,
                }}
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </Providers>
    </>
  );
}

export default App;
