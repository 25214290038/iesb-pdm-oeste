import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function MetaList({
  metas,
  onDelete,
}) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}

      renderItem={({ item }) => (
        <Pressable
          onPress={() => onDelete(item.id)}
          android_ripple={{ color: '#00000020' }}
          style={styles.pressable}
        >
          <View style={styles.item}>

            <Text style={styles.text}>
              {item.texto}
            </Text>

            <Text style={styles.date}>
              Criada em: {item.criadaEm}
            </Text>

          </View>
        </Pressable>
      )}

      ListEmptyComponent={
        <Text style={styles.empty}>
          Nenhuma meta cadastrada.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  pressable: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },

  item: {
    backgroundColor: '#eeeeee',
    padding: 15,
    borderRadius: 8,
  },

  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  date: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },

  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});