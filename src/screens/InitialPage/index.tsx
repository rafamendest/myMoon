import React from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar, Image, Text} from 'react-native';
import {Button} from 'react-native-paper';
import { colors } from '../../utils/colors';

interface iInitialPage {
  navigation: any;
}

function InitialPage({ navigation }: iInitialPage): React.JSX.Element {

  return (
    <SafeAreaView style={styles.containerSafeView}>
    <StatusBar />
    <View style={styles.container}>
    <Image 
          source={require('../../assets/images/moon.png')} 
          style={styles.image} 
          resizeMode="contain"
        />
    <View style={{height: 10}} />
    <Text style={styles.text}>
        My Moon
    </Text>
    <View style={{height: 50}} />
      <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Entrar')}>
      <Text style={{ fontSize: 18 }}>Entrar</Text>
      </Button>
      <View style={{height: 10}} />
      <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Cadastrar')}>
      <Text style={{ fontSize: 18 }}>Cadastrar</Text>
      </Button>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafeView: {
    flex: 1,
    backgroundColor: colors.backgroundContainer,
  },
  container: {
    flex: 1,
    marginBottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
  },
  image: {
    width: 250, 
    height: 250,
    // marginBottom: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
  }
});

export default InitialPage;
