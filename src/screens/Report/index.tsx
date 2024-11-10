import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import {Button, Snackbar} from 'react-native-paper';
import {useState} from 'react';
import {doc, getDoc, collection, addDoc} from 'firebase/firestore';
import {RadioButton} from 'react-native-paper';
import {db} from '../../database/firebaseConnection';
import {RootState} from '../../store';
import {useDispatch, useSelector} from 'react-redux';
import {
  showSnackbar,
  snackbarMessage,
} from '../../store/features/snackbarSlice';

const Report = () => {
  const [oneChecked, setOneChecked] = useState('');
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
      });
      dispatch(showSnackbar(true));
      dispatch(snackbarMessage('Denúncia feita com sucesso!'));
    } catch ({code}: any) {
      dispatch(showSnackbar(true));
      dispatch(snackbarMessage(code));
    }
  };

  return (
    <SafeAreaView style={styles.containerSafeView}>
      <ScrollView contentContainerStyle={styles.containerScroll}>
        <Text style={styles.textTitle}>Faça sua denúncia!</Text>
        <View style={styles.viewQuestions}>
          <Text style={styles.textQuestions}>Pergunta teste bla bla bla?</Text>
          <View style={styles.radioContainer}>
            <View style={styles.radioButton}>
              <RadioButton
                value="yes"
                status={oneChecked === 'yes' ? 'checked' : 'unchecked'}
                onPress={() => setOneChecked('yes')}
              />
              <Text>Sim</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton
                value="no"
                status={oneChecked === 'no' ? 'checked' : 'unchecked'}
                onPress={() => setOneChecked('no')}
              />
              <Text>Não</Text>
            </View>
          </View>
        </View>

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleRegisterReport()}>
          Registrar denúncia
        </Button>
        <Snackbar visible={snackBarOpen} onDismiss={onDismissSnackBar}>
          {message}
        </Snackbar>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeView: {
    flex: 1,
    backgroundColor: colors.backgroundContainer,
  },
  containerScroll: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  radioContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  viewQuestions: {
    marginBottom: 50,
  },
  textQuestions: {
    fontSize: 16,
  },
  button: {
    marginTop: 50,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 50,
  },
  textReport: {
    marginTop: 30,
    width: 350,
  },
});

export default Report;
