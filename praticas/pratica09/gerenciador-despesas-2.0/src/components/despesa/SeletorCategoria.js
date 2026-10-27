import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CATEGORIES } from '../../constants/categories';
import { useTheme } from '../../constants/theme';

const OPTIONS = ['Todas', ...CATEGORIES];

export default function SeletorCategoria({ selecionada, onSelecionar }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {OPTIONS.map((option) => {
        const active = option === selecionada;
        return (
          <Pressable
            key={option}
            onPress={() => onSelecionar(option)}
            style={({ pressed }) => [
              styles.chip,
              { backgroundColor: active ? theme.button : theme.chip },
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.text,
                { color: active ? '#ffffff' : theme.chipText },
                active && styles.textActive,
              ]}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  chip: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
  text: { fontSize: 14 },
  textActive: { fontWeight: 'bold' },
  pressed: { opacity: 0.6 },
});