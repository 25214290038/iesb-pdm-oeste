import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDataFormatada } from '../../util/data';

export default function DespesaItem({ id, descricao, valor, data, categoria }) {
  const navigation = useNavigation();

  function aoPressionar() {
    navigation.navigate('GerenciarDespesa', { despesaId: id });
  }

  return (
    <Pressable
      onPress={aoPressionar}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.item}>
        <View style={styles.info}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>{categoria}</Text>
          </View>
        </View>
        <View style={styles.valorContainer}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#5b3fd1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 3,
  },
  info: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: 'bold', color: 'white', marginBottom: 4 },
  data: { color: '#e4d9ff', marginBottom: 6 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e4e4e4',
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  tagTexto: { fontSize: 12, color: '#333' },
  valorContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderRadius: 4,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valor: { fontWeight: 'bold', color: '#5b3fd1' },
});