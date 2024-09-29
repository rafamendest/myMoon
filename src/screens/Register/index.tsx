import React from 'react';
import {StyleSheet, View, SafeAreaView, StatusBar, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import { colors } from '../../utils/colors';
import { db, auth } from '../../database/firebaseConnection'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'
import { errorsAuth } from '../../utils/errors';
import { useDispatch } from 'react-redux';
import { showSnackbar, snackbarMessage } from '../../store/features/snackbarSlice';

interface iRegister {
    navigation: any;
  }

function Register({ navigation }: iRegister): React.JSX.Element {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();

  const handleCreateUser = async () => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", response.user.uid), {
            nome: '',
            cpf: '',
            dataNascimento: ''
        });
        dispatch(showSnackbar(true));
        dispatch(snackbarMessage('Cadastro feito com sucesso!'));
        navigation.navigate('Entrar');
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
    <Text style={styles.text}>Digite seu email e senha para cadastro</Text>
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
      <Button mode="text" onPress={() => handleCreateUser()}>
        Fazer Cadastro
      </Button>
      <Text style={styles.textInfoPassword}>{"(A senha deve ter mais de 6 dígitos)"}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerEmail: {
    width: 300,
  },
  containerPassword: {
    width: 300,
  },
  text: {
    marginBottom: 10,
    fontSize: 16
  },
  textInfoPassword: {

  }
});

export default Register;
