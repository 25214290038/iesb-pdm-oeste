import {
  StyleSheet,
  TextInput,
  Pressable,
  Text,
  View,
} from 'react-native';

export default function MetaInput({
  value,
  onChangeText,
  onAdd,
}) {
  return (
    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder="Digite uma meta"
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable
        style={styles.button}
        onPress={onAdd}
        android_ripple={{ color: '#ffffff55' }}
      >
        <Text style={styles.buttonText}>
          Adicionar
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#333',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    overflow: 'hidden',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});