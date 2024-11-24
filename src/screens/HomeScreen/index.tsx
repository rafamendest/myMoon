import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {db} from '../../database/firebaseConnection';
import {doc, getDoc} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {colors} from '../../utils/colors';
import {Button, Snackbar} from 'react-native-paper';
import {
  showSnackbar,
  snackbarMessage,
} from '../../store/features/snackbarSlice';

interface iHomeScreen {
  navigation: any;
}

const HomeScreen = ({navigation}: iHomeScreen) => {
  const {userUid} = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState('');

  const {showSnackbar: snackBarOpen, message} = useSelector(
    (state: RootState) => state.snackbar,
  );

  const dispatch = useDispatch();
  const onDismissSnackBar = () => {
    dispatch(showSnackbar(false));
    dispatch(snackbarMessage(''));
  };

  const getName = async () => {
    const docRefName = doc(db, 'users', userUid);
    const response = await getDoc(docRefName);
    setFirstName(response.get('primeiroNome'));
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <SafeAreaView style={styles.containerSafeView}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Image
          source={require('../../assets/images/moon3.png')}
          style={styles.image}
          resizeMode="contain"
        />
        {firstName?.length > 0 && <Text>Olá {firstName}, seja bem vinda!</Text>}
        <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('Denúncia')}>
          Registrar novo ciclo
        </Button>
      </View>
      <Snackbar visible={snackBarOpen} onDismiss={onDismissSnackBar}>
        {message}
      </Snackbar>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeView: {
    flex: 1,
    backgroundColor: colors.backgroundContainer,
  },
  button: {
    marginTop: 100,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default HomeScreen;
