/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import appEmitter from '../../utils/appEmitter';

function Login(): React.JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const doLogin = () => {
    appEmitter.emit('doLogin');
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.containerEmail}
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <View style={{height: 20}} />
      <TextInput
        style={styles.containerPassword}
        label="Senha"
        textContentType="password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={{height: 20}} />
      <Button mode="text" onPress={() => doLogin()}>
        Entrar
      </Button>
      <View style={{height: 40}} />
      <Button mode="contained" onPress={() => console.log('Pressed')}>
        Cadastrar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerEmail: {
    width: 300,
  },
  containerPassword: {
    width: 300,
  },
});

export default Login;
