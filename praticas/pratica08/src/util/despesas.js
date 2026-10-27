// Tarefa 3: filtragem com .filter()
export function filtrarPorCategoria(despesas, categoria) {
  if (categoria === 'Todas') {
    return despesas;
  }
  return despesas.filter((despesa) => despesa.categoria === categoria);
}
