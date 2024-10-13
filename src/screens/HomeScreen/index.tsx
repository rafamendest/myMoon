import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { db } from '../../database/firebaseConnection';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { colors } from '../../utils/colors';

const HomeScreen = () => {
  
  const { userUid } = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState('');

  const getName = async () => {
      const docRefName = doc(db, "users", userUid);
      const response = await getDoc(docRefName);
      setFirstName(response.get('primeiroNome'));
  }

  useEffect(() => {
    getName();
  }, [])


  return (
    <SafeAreaView style={styles.containerSafeView}>
    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
      {firstName?.length > 0 && (
        <Text>Olá {firstName}, seja bem vindo(a)!</Text>
      )}
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeView: {
    flex: 1,
    backgroundColor: colors.backgroundContainer,
  },
});

export default HomeScreen;
