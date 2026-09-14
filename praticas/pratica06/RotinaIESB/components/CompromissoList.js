import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
} from 'react-native';

export default function CompromissoList({
  itens,
  onDelete,
  tituloLista,
  listaVazia,
}) {
  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
      ]}
      onPress={() => onDelete(item.id)}
      android_ripple={{ color: '#dddddd' }}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>
          {item.texto}
        </Text>

        <Text style={styles.dateText}>
          {item.criadoEm}
        </Text>
      </View>

      <Text style={styles.deleteText}>
        ✕
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {tituloLista}
      </Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>
            {listaVazia}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },

  itemPressed: {
    opacity: 0.6,
  },

  itemContent: {
    flex: 1,
  },

  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },

  dateText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },

  deleteText: {
    fontSize: 18,
    marginLeft: 10,
  },

  empty: {
    textAlign: 'center',
    marginTop: 30,
    color: '#666',
  },
});