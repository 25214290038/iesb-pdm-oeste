export function getDataFormatada(data) {
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  return `${dia}/${mes}/${data.getFullYear()}`;
}

export function getDataMenosDias(data, dias) {
  return new Date(data.getFullYear(), data.getMonth(), data.getDate() - dias);
}

// AAAA-MM-DD no fuso local (usado no campo de data da web)
export function getDataISO(data) {
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

// Futura = a partir da meia-noite de amanhã
export function isDataFutura(data) {
  const hoje = new Date();
  const amanha = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);
  return data >= amanha;
}