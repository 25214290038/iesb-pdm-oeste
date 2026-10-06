import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { DespesasContext } from '../store/despesas-context';
import { getDataMenosDias } from '../util/data';
import { filtrarPorCategoria } from '../util/despesas';
import SeletorCategoria from '../components/despesa/SeletorCategoria';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes() {
  const { despesas } = useContext(DespesasContext);
  const [filtro, setFiltro] = useState('Todas');

  const seteDiasAtras = getDataMenosDias(new Date(), 7);
  const recentes = despesas.filter((despesa) => despesa.data >= seteDiasAtras);
  const despesasFiltradas = filtrarPorCategoria(recentes, filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filtro}>
        <SeletorCategoria selecionada={filtro} onSelecionar={setFiltro} incluirTodas />
      </View>
      <DespesaSaida despesas={despesasFiltradas} periodo={`Últimos 7 dias - ${filtro}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  filtro: { marginBottom: 12 },
});