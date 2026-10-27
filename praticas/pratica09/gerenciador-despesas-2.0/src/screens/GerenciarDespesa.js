import { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Platform,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useExpenses } from '../store/expenses-context';
import { useTheme } from '../constants/theme';
import { getDataFormatada, getDataISO, isDataFutura } from '../util/data';
import CategoriaModal from '../components/despesa/CategoriaModal';

// Retorna um objeto com uma mensagem por campo inválido
function validate(values) {
  const errors = {};

  if (values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter no mínimo 3 caracteres.';
  }

  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  if (isDataFutura(values.date)) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Escolha uma categoria.';
  }

  return errors;
}

function Field({ label, error, theme, children }) {
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
      {children}
      {error ? <Text style={[styles.error, { color: theme.error }]}>{error}</Text> : null}
    </View>
  );
}

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const theme = useTheme();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;
  const editedExpense = expenses.find((expense) => expense.id === expenseId);

  // Estado único do formulário
  const [form, setForm] = useState({
    description: editedExpense?.description ?? '',
    amount: editedExpense ? String(editedExpense.amount) : '',
    date: editedExpense?.date ?? new Date(),
    category: editedExpense?.category ?? '',
  });
  const [errors, setErrors] = useState({});
  const [showPicker, setShowPicker] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [webDateText, setWebDateText] = useState(getDataISO(form.date)); // só na web

  useLayoutEffect(() => {
    navigation.setOptions({ title: isEditing ? 'Editar despesa' : 'Nova despesa' });
  }, [navigation, isEditing]);

  function handleChange(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);

    // Se o campo estava com erro, revalida: a mensagem some quando for corrigido
    if (errors[field]) {
      const newErrors = validate(next);
      setErrors((current) => ({ ...current, [field]: newErrors[field] }));
    }
  }

  // Máscara: só dígitos e no máximo 2 casas (aceita vírgula do teclado pt-BR)
  function handleAmountChange(text) {
    const normalized = text.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleDateChange(event, selectedDate) {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (event.type !== 'dismissed' && selectedDate) {
      handleChange('date', selectedDate);
    }
  }

  function handleWebDateChange(text) {
    setWebDateText(text);
    const parsed = new Date(`${text}T12:00:00`);
    if (/^\d{4}-\d{2}-\d{2}$/.test(text) && !isNaN(parsed.getTime())) {
      handleChange('date', parsed);
    }
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return; // bloqueia o salvamento
    }

    const data = {
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };

    if (isEditing) {
      updateExpense(expenseId, data);
    } else {
      addExpense(data);
    }
    navigation.goBack();
  }

  function removeAndGoBack() {
    deleteExpense(expenseId);
    navigation.goBack();
  }

  function handleDelete() {
    // Alert.alert não funciona no navegador; confirm só para testes na web
    if (Platform.OS === 'web') {
      if (window.confirm('Deseja realmente excluir esta despesa?')) removeAndGoBack();
      return;
    }
    Alert.alert('Excluir despesa', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: removeAndGoBack },
    ]);
  }

  function inputStyle(hasError) {
    return [
      styles.input,
      {
        backgroundColor: theme.input,
        color: theme.text,
        borderColor: hasError ? theme.error : theme.border,
      },
    ];
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Field label="Descrição" error={errors.description} theme={theme}>
          <TextInput
            style={inputStyle(!!errors.description)}
            value={form.description}
            onChangeText={(text) => handleChange('description', text)}
            placeholder="Ex: Almoço"
            placeholderTextColor={theme.textMuted}
          />
        </Field>

        <Field label="Valor (R$)" error={errors.amount} theme={theme}>
          <TextInput
            style={inputStyle(!!errors.amount)}
            value={form.amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholder="0.00"
            placeholderTextColor={theme.textMuted}
          />
        </Field>

        <Field label="Data" error={errors.date} theme={theme}>
          {Platform.OS === 'web' ? (
            <TextInput
              style={inputStyle(!!errors.date)}
              value={webDateText}
              onChangeText={handleWebDateChange}
              placeholder="AAAA-MM-DD"
              placeholderTextColor={theme.textMuted}
            />
          ) : (
            <>
              <Pressable style={inputStyle(!!errors.date)} onPress={() => setShowPicker(true)}>
                <Text style={{ color: theme.text, fontSize: 16 }}>
                  {getDataFormatada(form.date)}
                </Text>
              </Pressable>
              {showPicker && (
                <DateTimePicker value={form.date} mode="date" onChange={handleDateChange} />
              )}
            </>
          )}
        </Field>

        <Field label="Categoria" error={errors.category} theme={theme}>
          <Pressable
            style={[inputStyle(!!errors.category), styles.selectRow]}
            onPress={() => setShowCategories(true)}
          >
            <Text
              style={{
                color: form.category ? theme.text : theme.textMuted,
                fontSize: 16,
              }}
            >
              {form.category || 'Selecione uma categoria'}
            </Text>
            <Ionicons name="chevron-down" size={18} color={theme.textMuted} />
          </Pressable>
        </Field>

        <View style={styles.buttons}>
          <Pressable
            style={[styles.button, { backgroundColor: theme.chip }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: theme.chipText }}>Cancelar</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: theme.button }]} onPress={handleSave}>
            <Text style={styles.saveText}>Salvar</Text>
          </Pressable>
        </View>

        {isEditing && (
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color={theme.error} />
            <Text style={[styles.deleteText, { color: theme.error }]}>Excluir despesa</Text>
          </Pressable>
        )}
      </ScrollView>

      <CategoriaModal
        visible={showCategories}
        selected={form.category}
        onSelect={(category) => handleChange('category', category)}
        onClose={() => setShowCategories(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 16, paddingBottom: 48 },
  field: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 6 },
  input: { borderWidth: 1, borderRadius: 6, padding: 10, fontSize: 16 },
  selectRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  error: { fontSize: 13, marginTop: 4 },
  buttons: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 8 },
  button: { minWidth: 110, padding: 12, borderRadius: 6, alignItems: 'center' },
  saveText: { color: '#ffffff', fontWeight: 'bold' },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 32,
    padding: 12,
  },
  deleteText: { fontWeight: 'bold' },
});