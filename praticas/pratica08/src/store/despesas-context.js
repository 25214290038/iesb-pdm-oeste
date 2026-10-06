import { createContext, useState } from 'react';
import { DESPESAS_INICIAIS } from '../data/despesas';

export const DespesasContext = createContext({
  despesas: [],
  addDespesa: () => {},
  atualizarDespesa: () => {},
});

export default function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function addDespesa(dados) {
    const id = Date.now().toString();
    setDespesas((atual) => [{ ...dados, id }, ...atual]);
  }

  function atualizarDespesa(id, dados) {
    setDespesas((atual) =>
      atual.map((item) => (item.id === id ? { ...item, ...dados } : item))
    );
  }

  return (
    <DespesasContext.Provider value={{ despesas, addDespesa, atualizarDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}