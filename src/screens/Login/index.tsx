import React from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import appEmitter from '../../utils/appEmitter';
import { colors } from '../../utils/colors';
import { auth } from '../../database/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { errorsAuth } from '../../utils/errors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { showSnackbar, snackbarMessage } from '../../store/features/snackbarSlice';
import { setUserUid } from '../../store/features/userSlice';

interface iLogin {
  navigation: any;
}

function Login({ navigation }: iLogin): React.JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { showSnackbar: snackBarOpen, message } = useSelector((state: RootState) => state.snackbar);
  const dispatch = useDispatch();

  const onDismissSnackBar = () => {
    dispatch(showSnackbar(false));
    dispatch(snackbarMessage(''));
  }

  const doLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUserUid(user.user.uid.toString()))
      appEmitter.emit('doLogin');
    } catch ({ code }: any) {
      console.log(errorsAuth(code));
    } finally {
      setEmail('');
      setPassword('');
    }
  }

  return (
    <SafeAreaView style={styles.containerSafeView}>
    <StatusBar />
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
      <Button mode="contained" onPress={() => navigation.navigate('Cadastrar')}>
        Cadastrar
      </Button>
    </View>
    <Snackbar
        visible={snackBarOpen}
        onDismiss={onDismissSnackBar}
        >
        {message}
      </Snackbar>
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
