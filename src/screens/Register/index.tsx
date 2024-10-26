import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';
import {TextInput, Button, Snackbar} from 'react-native-paper';
import {colors} from '../../utils/colors';
import {db, auth} from '../../database/firebaseConnection';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {errorsAuth} from '../../utils/errors';
import {useDispatch, useSelector} from 'react-redux';
import {
  showSnackbar,
  snackbarMessage,
} from '../../store/features/snackbarSlice';
import DatePicker from 'react-native-date-picker';
import {cpfValidade} from './cpfValidade';
import {RootState} from '../../store';
import { errosValidades } from './errosValidades';

interface iRegister {
  navigation: any;
}

function Register({navigation}: iRegister): React.JSX.Element {
  const dispatch = useDispatch();
  const onDismissSnackBar = () => {
    dispatch(showSnackbar(false));
    dispatch(snackbarMessage(''));
  };
  const {showSnackbar: snackBarOpen, message} = useSelector(
    (state: RootState) => state.snackbar,
  );
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [secondName, setSecondName] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [date, setDate] = React.useState<Date | null>(null);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [isValidCPF, setIsValidCPF] = React.useState(false);
  

  const handleCreateUser = async () => {
    try {
      const noErrors = errosValidades({ cpf, date, isValidCPF, firstName, secondName })
      if (!noErrors.noErrors) {
        dispatch(showSnackbar(true));
        dispatch(snackbarMessage(noErrors.message));
        return;
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await setDoc(doc(db, 'users', response.user.uid), {
        primeiroNome: firstName,
        sobrenome: secondName,
        cpf: cpf,
        dataNascimento: date,
      });
      dispatch(showSnackbar(true));
      dispatch(snackbarMessage('Cadastro feito com sucesso!'));
      navigation.navigate('Entrar');
    } catch ({code}: any) {
      dispatch(showSnackbar(true));
      dispatch(snackbarMessage(errorsAuth(code)));
    } finally {
      setEmail('');
      setFirstName('');
      setCpf('');
      setPassword('')
      setDate(null);
    }
  };

  return (
    <SafeAreaView style={styles.containerSafeView}>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <View style={styles.container}>
          <Text style={styles.text}>Preencha os dados para cadastro</Text>
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
          <TextInput
            style={styles.containerPassword}
            label="Primeiro Nome"
            value={firstName}
            onChangeText={text => setFirstName(text)}
          />
          <View style={{height: 20}} />
          <TextInput
            style={styles.containerPassword}
            label="Sobrenome"
            value={secondName}
            onChangeText={text => setSecondName(text)}
          />
          <View style={{height: 20}} />
          <TextInput
            style={styles.containerPassword}
            label="CPF"
            value={cpf}
            onChangeText={text => {
              setIsValidCPF(cpfValidade(text));
              setCpf(text);
            }}
          />
          {!isValidCPF && cpf.length > 0 && (
            <Text style={{color: 'red'}}>CPF inválido</Text>
          )}
          <View style={{height: 20}} />
          <TextInput
            style={styles.containerPassword}
            label="Data de nascimento"
            disabled
            value={
              date
                ? `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
                : ''
            }
          />
          <View style={{height: 20}} />
          <DatePicker
            modal
            open={openDatePicker}
            date={date ? date : new Date()}
            mode="date"
            maximumDate={new Date()}
            onConfirm={selectedDate => {
              setOpenDatePicker(false);
              setDate(selectedDate);
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
          />
          <View style={{height: 20}} />
          <Button mode="text" onPress={() => setOpenDatePicker(true)}>
            Selecionar data de nascimento
          </Button>
          <View style={{height: 20}} />
          <Button mode="contained" onPress={() => handleCreateUser()}>
            Fazer Cadastro
          </Button>
          <Text style={styles.textInfoPassword}>
            {'(A senha deve ter mais de 6 dígitos)'}
          </Text>
          <Snackbar visible={snackBarOpen} onDismiss={onDismissSnackBar}>
            {message}
          </Snackbar>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafeView: {
    flex: 1,
    backgroundColor: colors.backgroundContainer,
  },
  containerScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 16,
  },
  textInfoPassword: {},
});

export default Register;
