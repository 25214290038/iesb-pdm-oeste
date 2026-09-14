import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
}) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder={labels.placeholderCompromisso}
        value={value}
        onChangeText={onChangeText}
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onAdd}
        android_ripple={{ color: '#cccccc' }}
      >
        <Text style={styles.buttonText}>
          {labels.botaoAdicionar}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  input: {
    width: '68%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  button: {
    width: '28%',
    backgroundColor: '#222',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});