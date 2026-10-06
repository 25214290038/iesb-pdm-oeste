import { getDataMenosDias } from '../util/data';

export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

const hoje = new Date();

export const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Supermercado', valor: 89.9, data: getDataMenosDias(hoje, 1), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Uber', valor: 25.5, data: getDataMenosDias(hoje, 2), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Cinema', valor: 45.0, data: getDataMenosDias(hoje, 4), categoria: 'Lazer' },
  { id: 'd4', descricao: 'Conta de luz', valor: 150.0, data: getDataMenosDias(hoje, 10), categoria: 'Contas' },
  { id: 'd5', descricao: 'Restaurante', valor: 62.3, data: getDataMenosDias(hoje, 15), categoria: 'Alimentação' },
  { id: 'd6', descricao: 'Gasolina', valor: 120.0, data: getDataMenosDias(hoje, 20), categoria: 'Transporte' },
];