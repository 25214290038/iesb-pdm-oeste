export function filterByCategory(expenses, category) {
  if (category === 'Todas') {
    return expenses;
  }
  return expenses.filter((expense) => expense.category === category);
}