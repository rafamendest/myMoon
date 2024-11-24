import {StyleSheet, View} from 'react-native';
import {RadioButton, Text, TextInput} from 'react-native-paper';

interface iQuestions {
  oneChecked: string;
  setOneChecked: (value: string) => void;
  twoChecked: string;
  setTwoChecked: (value: string) => void;
  threeChecked: string;
  setThreeChecked: (value: string) => void;
  fourChecked: string;
  setFourChecked: (value: string) => void;
  fiveChecked: string;
  setFiveChecked: (value: string) => void;
  sixChecked: string;
  setSixChecked: (value: string) => void;
  sevenChecked: string;
  setSevenChecked: (value: string) => void;
  eigthChecked: string;
  setEightChecked: (value: string) => void;
  nineChecked: string;
  setNineChecked: (value: string) => void;
  tenChecked: string;
  setTenChecked: (value: string) => void;
  elevenChecked: string;
  setElevenChecked: (value: string) => void;
  twelveChecked: string;
  setTwelveChecked: (value: string) => void;
  thirteenChecked: string;
  setThirteenChecked: (value: string) => void;
  messageReport: string;
  setMessageReport: (value: string) => void;
  foneNumber: string;
  setFoneNumber: (value: string) => void;
  familyWave: string;
  setFamilyWave: (value: string) => void;
}

const Questions = ({
  eigthChecked,
  elevenChecked,
  fiveChecked,
  fourChecked,
  nineChecked,
  oneChecked,
  setEightChecked,
  setElevenChecked,
  setFiveChecked,
  setFourChecked,
  setNineChecked,
  setOneChecked,
  setSevenChecked,
  setSixChecked,
  setTenChecked,
  setThirteenChecked,
  setThreeChecked,
  setTwelveChecked,
  setTwoChecked,
  sevenChecked,
  sixChecked,
  tenChecked,
  thirteenChecked,
  threeChecked,
  twelveChecked,
  twoChecked,
  messageReport,
  setMessageReport,
  foneNumber,
  setFoneNumber,
  familyWave,
  setFamilyWave
}: iQuestions) => {
  return (
    <>
      <Text style={styles.textQuestions}>
        Você se sente segura neste momento?
      </Text>
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

      <Text style={styles.textQuestions}>Você precisa de ajuda imediata?</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={twoChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setTwoChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={twoChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setTwoChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>Você está em perigo?</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={threeChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setThreeChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={threeChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setThreeChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>
        Você tem alguém com quem pode contar agora?
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={fourChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setFourChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={fourChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setFourChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>
        Você gostaria que alguém ligasse para você ou para a polícia?
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={fiveChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setFiveChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={fiveChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setFiveChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>Você já fez uma denúncia antes?</Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={sixChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setSixChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={sixChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setSixChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>
        Você tem uma estratégia de saída?
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={sevenChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setSevenChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={sevenChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setSevenChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>
        Você se sente ameaçada por alguém específico?
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={eigthChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setEightChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={eigthChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setEightChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>
        Você tem medo de que alguém descubra que você está pedindo ajuda?
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={nineChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setNineChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={nineChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setNineChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>
        Você gostaria de falar com alguém agora?
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={tenChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setTenChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={tenChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setTenChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>
        Você gostaria de informações sobre abrigos ou apoio?
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={elevenChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setElevenChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={elevenChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setElevenChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>
        Você se sente confortável em compartilhar sua localização?
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={twelveChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setTwelveChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={twelveChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setTwelveChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>

      <Text style={styles.textQuestions}>
        Você tem algum plano de segurança em mente?
      </Text>
      <View style={styles.radioContainer}>
        <View style={styles.radioButton}>
          <RadioButton
            value="yes"
            status={thirteenChecked === 'yes' ? 'checked' : 'unchecked'}
            onPress={() => setThirteenChecked('yes')}
          />
          <Text>Sim</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="no"
            status={thirteenChecked === 'no' ? 'checked' : 'unchecked'}
            onPress={() => setThirteenChecked('no')}
          />
          <Text>Não</Text>
        </View>
      </View>
      <TextInput
        style={styles.textBox}
        label={'Coloque mais detalhes aqui - Opcional'}
        onChangeText={text => setMessageReport(text)}
        value={messageReport}
      />

      <View style={styles.textTelephone}>
        <Text>Caso queira deixar telefone de algum parente</Text>
      </View>
      <TextInput
        style={styles.textBoxTelephone}
        label={'Digite aqui'}
        onChangeText={value => setFoneNumber(value)}
        value={foneNumber}
        keyboardType='numeric'
      />
      <View style={styles.textBoxParentesc}>
        <Text>Qual o parentesco desse telefone?</Text>
      </View>
      <TextInput
        style={styles.textBoxTelephone}
        label={'Ex: Pai, Mãe...'}
        onChangeText={value => setFamilyWave(value)}
        value={familyWave}
      />
    </>
  );
};

const styles = StyleSheet.create({
  textQuestions: {
    fontSize: 16,
    marginTop: 50,
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  textBox: {
    marginTop: 30,
    maxHeight: 400,
    width: '90%',
  },
  textBoxTelephone: {
    maxHeight: 400,
    width: '90%',
  },
  textTelephone: {
    fontSize: 16,
    marginTop: 40,
  },
  textBoxParentesc: {
    fontSize: 16,
    marginTop: 20,
  }
});

export default Questions;
