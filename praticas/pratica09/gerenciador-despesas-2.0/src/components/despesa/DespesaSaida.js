import DespesaSumario from './DespesaSumario';
import DespesaLista from './DespesaLista';

export default function DespesaSaida({ expenses, label, emptyTitle, emptyHint }) {
  return (
    <DespesaLista
      expenses={expenses}
      ListHeaderComponent={<DespesaSumario expenses={expenses} label={label} />}
      emptyTitle={emptyTitle}
      emptyHint={emptyHint}
    />
  );
}