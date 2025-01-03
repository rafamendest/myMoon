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
import Questions from './Components/Questions';

interface iReport {
  navigation: any;
}

const Report = ({ navigation }: iReport) => {
  const [oneChecked, setOneChecked] = useState('');
  const [twoChecked, setTwoChecked] = useState('');
  const [threeChecked, setThreeChecked] = useState('');
  const [fourChecked, setFourChecked] = useState('');
  const [fiveChecked, setFiveChecked] = useState('');
  const [sixChecked, setSixChecked] = useState('');
  const [sevenChecked, setSevenChecked] = useState('');
  const [eigthChecked, setEightChecked] = useState('');
  const [nineChecked, setNineChecked] = useState('');
  const [tenChecked, setTenChecked] = useState('');
  const [elevenChecked, setElevenChecked] = useState('');
  const [twelveChecked, setTwelveChecked] = useState('');
  const [thirteenChecked, setThirteenChecked] = useState('');
  const [messageReport, setMessageReport] = useState('');
  const [foneNumber, setFoneNumber] = useState('');
  const [familyWave, setFamilyWave] = useState('');

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
        pergunta1: oneChecked,
        pergunta2: twoChecked,
        pergunta3: threeChecked,
        pergunta4: fourChecked,
        pergunta5: fiveChecked,
        pergunta6: sixChecked,
        pergunta7: sevenChecked,
        pergunta8: eigthChecked,
        pergunta9: nineChecked,
        pergunta10: tenChecked,
        pergunta11: elevenChecked,
        pergunta12: twelveChecked,
        pergunta13: thirteenChecked,
        mensagem: messageReport,
        telefone: foneNumber,
        parentesco: familyWave,
      });
      dispatch(showSnackbar(true));
      dispatch(snackbarMessage('Denúncia feita com sucesso!'));
      navigation.navigate('Início');
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
          <Questions
            oneChecked={oneChecked}
            setOneChecked={setOneChecked}
            twoChecked={twoChecked}
            setTwoChecked={setTwoChecked}
            threeChecked={threeChecked}
            setThreeChecked={setThreeChecked}
            fourChecked={fourChecked}
            setFourChecked={setFourChecked}
            fiveChecked={fiveChecked}
            setFiveChecked={setFiveChecked}
            sixChecked={sixChecked}
            setSixChecked={setSixChecked}
            sevenChecked={sevenChecked}
            setSevenChecked={setSevenChecked}
            eigthChecked={eigthChecked}
            setEightChecked={setEightChecked}
            nineChecked={nineChecked}
            setNineChecked={setNineChecked}
            tenChecked={tenChecked}
            setTenChecked={setTenChecked}
            elevenChecked={elevenChecked}
            setElevenChecked={setElevenChecked}
            twelveChecked={twelveChecked}
            setTwelveChecked={setTwelveChecked}
            thirteenChecked={thirteenChecked}
            setThirteenChecked={setThirteenChecked}
            messageReport={messageReport}
            setMessageReport={setMessageReport}
            foneNumber={foneNumber}
            setFoneNumber={setFoneNumber}
            familyWave={familyWave}
            setFamilyWave={setFamilyWave}
          />
        </View>
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleRegisterReport()}>
          <Text style={{ fontSize: 18 }}>Registrar denúncia</Text>
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
    paddingBottom: 100,
  },
  viewQuestions: {
    marginBottom: 50,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 250,
    height: 50,
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  textReport: {
    marginTop: 30,
    width: 350,
  },
});

export default Report;