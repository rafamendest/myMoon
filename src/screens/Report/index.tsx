import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import {Button, Snackbar, TextInput} from 'react-native-paper';
import {useState} from 'react';
import {doc, getDoc, collection, addDoc} from 'firebase/firestore';
import {db} from '../../database/firebaseConnection';
import {RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {
  showSnackbar,
  snackbarMessage,
} from '../../store/features/snackbarSlice';

const Report = () => {
  const [report, setReport] = useState('');
  const {userUid} = useSelector((state: RootState) => state.user);
  const {showSnackbar: snackBarOpen, message} = useSelector(
    (state: RootState) => state.snackbar,
  );

  const dispatch = useDispatch();
  const onDismissSnackBar = () => {
    dispatch(showSnackbar(false));
    dispatch(snackbarMessage(''));
  };

  const handleRegisterReport = async () => {
    try {
      const docRefName = doc(db, 'users', userUid);
      const response = await getDoc(docRefName);
      const firstName = response.get('primeiroNome');
      const secondName = response.get('sobrenome');
      const cpf = response.get('cpf');
      const dateBorn = response.get('dataNascimento');

      await addDoc(collection(db, 'reports'), {
        primeiroNome: firstName,
        sobrenome: secondName,
        cpf: cpf,
        dataDaDenuncia: new Date().toString(),
        dataNascimento: dateBorn,
        report: report,
      });
      dispatch(showSnackbar(true));
      dispatch(snackbarMessage('Denúncia feita com sucesso!'));
    } catch ({code}: any) {
      dispatch(showSnackbar(true));
      dispatch(snackbarMessage(code));
    } finally {
      setReport('');
    }
  };

  return (
    <SafeAreaView style={styles.containerSafeView}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Faça sua denúncia!</Text>

        <TextInput
          style={styles.textReport}
          label="Denúncia"
          value={report}
          onChangeText={text => setReport(text)}
          multiline={true}
          numberOfLines={7}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleRegisterReport()}>
          Registrar denúncia
        </Button>
        <Snackbar visible={snackBarOpen} onDismiss={onDismissSnackBar}>
          {message}
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeView: {
    flex: 1,
    backgroundColor: colors.backgroundContainer,
  },
  button: {
    marginTop: 50,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textReport: {
    marginTop: 30,
    width: 350,
  },
});

export default Report;
