import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import {
  TITULO_APP,
  PLACEHOLDER_DISCIPLINA,
  TEXTO_BOTAO,
  TITULO_LISTA
} from './label.js';

const disciplinas = [
  'Programação para Dispositivos Móveis',
  'Banco de Dados',
  'Engenharia de Software',
  'Desenvolvimento Web'
];

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{TITULO_APP}</Text>

      <View style={styles.linhaCadastro}>
        <TextInput
          style={styles.input}
          placeholder={PLACEHOLDER_DISCIPLINA}
        />

        <View style={styles.botao}>
          <Button title={TEXTO_BOTAO} />
        </View>
      </View>

      <Text style={styles.tituloLista}>
        {TITULO_LISTA}
      </Text>

      {disciplinas.map((disciplina, index) => (
        <Text key={index} style={styles.itemLista}>
          {disciplina}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({

  //container principal da tela
  //flex: 1 faz o container ocupar todo o espaço disponível
  //padding cria um espaçamento interno entre os elementos e as bordas
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff'
  },

  //estilo do título principal do aplicativo
  //o texto fica maior, em negrito e centralizado na tela
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  //organiza o campo de texto e o botão lado a lado
  //justifyContent: 'space-between' cria espaço entre os dois elementos
  //alignItems: 'center' alinha os elementos verticalmente ao centro
  linhaCadastro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25
  },

  //campo utilizado para digitar o nome da disciplina
  //width: '70%' demonstra o uso de largura percentual
  //borderWidth, borderColor e borderRadius criam a borda e deixam
  //o campo visualmente organizado
  input: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 10
  },

  //define aproximadamente 27% da largura para o botão,
  //mantendo proporção adequada em relação ao campo de entrada
  botao: {
    width: '27%'
  },

  //estilo do título da lista de disciplinas
  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },

  //estilo de cada disciplina apresentada na lista
  //marginBottom cria espaço entre os itens
  //padding cria espaço interno
  //backgroundColor destaca visualmente cada disciplina
  itemLista: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8
  }

});