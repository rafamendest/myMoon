import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../utils/colors';
import React, {useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';

const Calendar = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    if (startDate !== null && endDate !== null) {
      setStartDate(null);
      setEndDate(null);
      return;
    }
    setStartDate(date);
    const newEndDate = new Date(date);
    newEndDate.setDate(newEndDate.getDate() + 28);
    setEndDate(newEndDate);
  };

  return (
    <SafeAreaView style={styles.containerSafeView}>
      <View style={styles.container}>
        <CalendarPicker
          onDateChange={handleDateChange}
          selectedStartDate={startDate as Date}
          selectedEndDate={endDate as Date}
          allowRangeSelection={true}
          nextTitle='Próximo'
          previousTitle='Anterior'
          weekdays={["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"]}
          months={[
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
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
