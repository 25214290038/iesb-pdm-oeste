# RotinaIESB

Aplicativo desenvolvido em React Native com Expo para organização da rotina acadêmica.

O aplicativo permite cadastrar compromissos, visualizar os itens cadastrados, remover compromissos e manter os dados salvos localmente mesmo após fechar e reabrir o aplicativo.

##  Objetivo

O projeto foi desenvolvido para praticar os conceitos apresentados nas Aulas 02 a 06 da disciplina de Programação para Dispositivos Móveis, utilizando React Native e Expo.

Foram aplicados conceitos como:

- Componentes do React Native;
- `useState`;
- `useEffect`;
- Props;
- Componentização;
- `Pressable`;
- `FlatList`;
- Flexbox;
- `StyleSheet`;
- `AsyncStorage`;
- `JSON.stringify()` e `JSON.parse()`;
- `SafeAreaProvider` e `SafeAreaView`;
- Importação e exportação de componentes e constantes.

##  Funcionalidades

O aplicativo possui as seguintes funcionalidades:

- Cadastro de compromissos acadêmicos;
- Validação para impedir o cadastro de compromissos vazios;
- Exibição dos compromissos cadastrados;
- Registro da data e hora de criação;
- Remoção de compromissos;
- Feedback visual ao pressionar os botões;
- Armazenamento local dos compromissos;
- Recuperação dos compromissos após fechar e reabrir o aplicativo.

##  Tecnologias utilizadas

- React Native
- Expo
- JavaScript
- AsyncStorage
- React Native Safe Area Context

##  Como executar o projeto

O projeto foi criado utilizando o Expo com o seguinte comando:

```bash
npx create-expo-app@latest RotinaIESB --template blank