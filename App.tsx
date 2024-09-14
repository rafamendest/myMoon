/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Login from './src/screens/Login';
import {colors} from './src/utils/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import appEmitter from './src/utils/appEmitter';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function App(): React.JSX.Element {

  const [isLogged, setIsLogged] = useState(true);

  appEmitter.on('doLogin', () => {
    setIsLogged(true);
  });
  
  return (
    <>
      <NavigationContainer>
        {!isLogged && (
          <SafeAreaView style={styles.container}>
            <StatusBar />
            <Login />
          </SafeAreaView>
        )}
        {isLogged && (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundContainer,
  },
});

export default App;
