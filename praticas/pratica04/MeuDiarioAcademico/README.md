MEU DIÁRIO ACADEMICO

Aplicativo desenvolvido em React Native com Expo para a disciplina de Programação para Dispositivos Móveis.

O objetivo do projeto é criar uma tela inicial para cadastro rápido e visualização das disciplinas do semestre, utilizando componentes básicos do React Native, import/export, StyleSheet e Flexbox.

SOBRE O PROJETO

O aplicativo apresenta:

Título do aplicativo;
Campo para informar o nome de uma disciplina;
Botão "Adicionar";
Lista com as disciplinas cadastradas;
Layout organizado utilizando Flexbox;
Estilos definidos com `StyleSheet`;
Rótulos separados no arquivo `label.js`.

TECNOLOGIAS UTILIZADAS

React Native
Expo
JavaScript
Flexbox
StyleSheet
`react-native-safe-area-context`

ARQUIVOS PRINCIPAIS

`App.js`
Contém a estrutura principal da tela, os componentes do React Native e os estilos utilizando `StyleSheet`.

`label.js`
Contém os textos utilizados na aplicação, que são exportados e posteriormente importados pelo `App.js`.

CRIAÇÃO DO PROJETO

O projeto foi criado utilizando o comando:

bash
npx create-expo-app@latest MeuDiarioAcademico --template blank


Após a criação do projeto, foi utilizado:

bash
cd MeuDiarioAcademico


Para iniciar a aplicação:

bash
npx expo start


LAYOUT E FLEXBOX

O layout utiliza Flexbox para organizar os componentes.

A linha de cadastro utiliza:

javascript
flexDirection: row


para posicionar o campo de texto e o botão lado a lado.

Também foi utilizado:

javascript
flex: 1


para fazer o container ocupar todo o espaço disponível.

Além disso, foi utilizada uma largura percentual:

javascript
width: 70%


para o campo de texto, tornando o layout mais flexível.

DISCIPLINAS APRESENTADAS

Atualmente, a lista utiliza um array fixo em JavaScript contendo:

Programação para Dispositivos Móveis
Banco de Dados
Engenharia de Software
Desenvolvimento Web

A lista é exibida utilizando o método .map() .

![tela principal funcionando](./MeuDiarioAcademico/telaprincipalfuncionando.png)

Projeto desenvolvido para a atividade ATIVIDADE 01 — Fundamentos de UI, Componentes e Layout da disciplina de Programação para Dispositivos Móveis — IESB.
