import { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DespesasContext } from '../store/despesas-context';
import { getDataFormatada } from '../util/data';
import SeletorCategoria from '../components/despesa/SeletorCategoria';

export default function GerenciarDespesa({ route, navigation }) {
  const { despesas, addDespesa, atualizarDespesa } = useContext(DespesasContext);

  const despesaId = route.params?.despesaId;
  const despesaEditada = despesas.find((d) => d.id === despesaId);
  const editando = !!despesaEditada;

  const [descricao, setDescricao] = useState(despesaEditada?.descricao ?? '');
  const [valor, setValor] = useState(despesaEditada ? String(despesaEditada.valor) : '');
  const [categoria, setCategoria] = useState(despesaEditada?.categoria ?? '');
  const [data, setData] = useState(despesaEditada?.data ?? new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [dataTexto, setDataTexto] = useState(''); // usado só na web
  const [erro, setErro] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar Despesa' : 'Adicionar Despesa' });
  }, [navigation, editando]);

  // Regex: só dígitos e no máximo 2 casas decimais
  function aoMudarValor(texto) {
    if (/^\d*\.?\d{0,2}$/.test(texto)) {
      setValor(texto);
    }
  }

  function aoMudarData(evento, dataSelecionada) {
    if (Platform.OS === 'android') {
      setMostrarPicker(false);
    }
    if (dataSelecionada) {
      setData(dataSelecionada);
    }
  }

  function aoMudarDataWeb(texto) {
    setDataTexto(texto);
    const nova = new Date(`${texto}T12:00:00`);
    if (/^\d{4}-\d{2}-\d{2}$/.test(texto) && !isNaN(nova.getTime())) {
      setData(nova);
    }
  }

  function aoSalvar() {
    const valorNumerico = parseFloat(valor);

    if (descricao.trim() === '' || valor === '' || categoria === '') {
      setErro('Preencha descrição, valor e categoria.');
      return;
    }
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      setErro('Informe um valor maior que zero.');
      return;
    }

    const dados = { descricao: descricao.trim(), valor: valorNumerico, data, categoria };

    if (editando) {
      atualizarDespesa(despesaId, dados);
    } else {
      addDespesa(dados);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex: Almoço"
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={aoMudarValor}
        keyboardType="decimal-pad"
        placeholder="0.00"
      />

      <Text style={styles.label}>Data</Text>
      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          value={dataTexto}
          onChangeText={aoMudarDataWeb}
          placeholder={`AAAA-MM-DD (atual: ${getDataFormatada(data)})`}
        />
      ) : (
        <>
          <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
            <Text>{getDataFormatada(data)}</Text>
          </Pressable>
          {mostrarPicker && (
            <DateTimePicker
              value={data}
              mode="date"
              maximumDate={new Date()}
              onChange={aoMudarData}
            />
          )}
        </>
      )}

      <Text style={styles.label}>Categoria</Text>
      <SeletorCategoria selecionada={categoria} onSelecionar={setCategoria} />

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      <View style={styles.botoes}>
        <Pressable style={[styles.botao, styles.cancelar]} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelarTexto}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.botao, styles.salvar]} onPress={aoSalvar}>
          <Text style={styles.salvarTexto}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 14, fontWeight: 'bold', marginTop: 16, marginBottom: 6 },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
  },
  erro: { color: 'red', marginTop: 16 },
  botoes: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, gap: 12 },
  botao: { minWidth: 110, padding: 12, borderRadius: 6, alignItems: 'center' },
  cancelar: { backgroundColor: '#e4e4e4' },
  cancelarTexto: { color: '#333' },
  salvar: { backgroundColor: '#3e04c3' },
  salvarTexto: { color: 'white', fontWeight: 'bold' },
});