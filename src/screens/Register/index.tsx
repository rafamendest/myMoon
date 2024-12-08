import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
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
import {errosValidades} from './errosValidades';
import {PermissionsAndroid} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import RNFS from 'react-native-fs';
import {API_URL, API_TOKEN} from '@env';
import {Checkbox} from 'react-native-paper';

interface iRegister {
  navigation: any;
}

function Register({navigation}: iRegister): React.JSX.Element {
  const [hasPermission, setHasPermission] = useState(false);
  const [gender, setGender] = useState('');

  const handleApi = async (base64String: string) => {
    // Montando a requisição com a imagem em Base64
    const formData = new FormData();
    formData.append('photo', base64String);
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Necessário para envio de arquivos
          token: API_TOKEN, // Cabeçalho de autenticação
        },
      });
      setGender(response?.data[0]?.gender?.value as string);
      if (response?.data[0]?.gender?.value) {
        dispatch(showSnackbar(true));
        dispatch(snackbarMessage('Reconhecimento facial feito com sucesso!'));
      }
    } catch (e) {
      console.log('erro: ', e);
    }
  };

  const convertToBase64 = async (uri: string) => {
    try {
      const base64String = await RNFS.readFile(uri, 'base64');
      await handleApi(base64String);
    } catch (error) {
      console.error('Erro ao converter para Base64:', error);
    }
  };

  const openCamera = () => {
    if (!hasPermission) {
      dispatch(showSnackbar(true));
      dispatch(snackbarMessage('Ative as permissões de câmera antes!'));
      return;
    }
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      async response => {
        if (response.didCancel) {
          console.log('Ação cancelada');
        } else if (response.errorCode) {
          console.log('Erro', response.errorMessage || 'Erro desconhecido');
        } else {
          const uri = response.assets?.[0]?.uri;
          if (uri) {
            await convertToBase64(uri);
          }
        }
      },
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Permissão para Usar a Câmera',
          message: 'O aplicativo precisa de acesso à sua câmera',
          buttonNeutral: 'Perguntar Depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const dispatch = useDispatch();
  const onDismissSnackBar = () => {
    dispatch(showSnackbar(false));
    dispatch(snackbarMessage(''));
  };
  const {showSnackbar: snackBarOpen, message} = useSelector(
    (state: RootState) => state.snackbar,
  );

  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [secondName, setSecondName] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [date, setDate] = React.useState<Date | null>(null);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [isValidCPF, setIsValidCPF] = React.useState(false);

  const handleCreateUser = async () => {
    if (gender == 'Male') {
      dispatch(showSnackbar(true));
      dispatch(
        snackbarMessage(
          'Cadastro não autorizado: este aplicativo é destinado exclusivamente para mulheres. Se você acredita que houve um erro, entre em contato com o suporte.',
        ),
      );
      return;
    }
    try {
      const noErrors = errosValidades({
        cpf,
        date,
        isValidCPF,
        firstName,
        secondName,
      });
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
      setPassword('');
      setDate(null);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

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
          <Button
            style={{width: 250, height: 50, justifyContent: 'center'}}
            mode="text"
            onPress={() => setOpenDatePicker(true)}>
            <Text style={{fontSize: 16}}>Selecionar data de nascimento</Text>
          </Button>
          <View style={{height: 20}} />
          <Text style={{ marginBottom: 10 }}>Aceito compartilhar meus dados acima para fins de cadastro</Text>
          <TouchableOpacity
            onPress={() => setChecked(!checked)}
            style={[styles.checkbox, checked && styles.checked]}>
            {checked && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <View style={{height: 20}} />
          <Button
            style={{width: 250, height: 50, justifyContent: 'center'}}
            mode="contained"
            onPress={() => openCamera()}>
            <Text style={{fontSize: 18}}>Fazer reconhecimento facial</Text>
          </Button>
          <View style={{height: 20}} />
          <Button
            style={{width: 200, height: 50, justifyContent: 'center'}}
            mode="contained"
            disabled={gender.length === 0 || !checked}
            onPress={() => handleCreateUser()}>
            <Text style={{fontSize: 18}}>Fazer Cadastro</Text>
          </Button>
          <Text>{'(A senha deve ter mais de 6 dígitos)'}</Text>
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
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: '#79b6c9',
  },
  checkmark: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Register;
