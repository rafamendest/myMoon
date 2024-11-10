import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import React, {useEffect, useRef, useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../../database/firebaseConnection';

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const {userUid} = useSelector((state: RootState) => state.user);
  const isFirstTime = useRef(true);

  const getDate = async () => {
    const docRefName = doc(db, 'users', userUid);
    const response = await getDoc(docRefName);
    if (Boolean(response.get('startDateCycle'))) {
      const startDateCycle = response.get('startDateCycle');
      const startDate = new Date(startDateCycle.seconds * 1000);
      setStartDate(startDate);
    }
    if (Boolean(response.get('endDateCycle'))) {
      const endDateCycle = response.get('endDateCycle');
    const endDate = new Date(endDateCycle.seconds * 1000);
    setEndDate(endDate);
    }
  };

  useEffect(() => {
    if (isFirstTime.current === true) {
      getDate();
      isFirstTime.current = false;
    }
  }, []);

  const handleDateChange = async (date: Date) => {
    if (startDate !== null && endDate !== null) {
      setStartDate(null);
      setEndDate(null);
      await updateDoc(doc(db, 'users', userUid), {
        startDateCycle: null,
        endDateCycle: null,
      });
      return;
    }
    setStartDate(date);
    const newEndDate = new Date(date);
    newEndDate.setDate(newEndDate.getDate() + 28);
    setEndDate(newEndDate);
    await updateDoc(doc(db, 'users', userUid), {
      startDateCycle: date,
      endDateCycle: newEndDate,
    });
  };

  return (
    <SafeAreaView style={styles.containerSafeView}>
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={handleDateChange}
          selectedStartDate={startDate as Date}
          selectedEndDate={endDate as Date}
          allowRangeSelection={true}
          selectedRangeStyle={{
            backgroundColor: colors.backgroundCalendarSelect
          }}
          nextTitle="Próximo"
          previousTitle="Anterior"
          weekdays={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
          months={[
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ]}
        />

        <View>
          <View style={styles.text}>
            <Text>
              Selecione uma data no calendário e será salvo uma média de 28 dias
              para seu ciclo
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerSafeView: {
    flex: 1,
    backgroundColor: colors.backgroundContainer,
  },
  text: {
    marginTop: 50,
    width: 300,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default Calendar;
