#  MetasSemestre

Aplicativo desenvolvido em React Native com Expo para cadastro e gerenciamento de metas acadêmicas do semestre.

O aplicativo permite adicionar e remover metas de estudo, armazenando os dados localmente para que permaneçam disponíveis mesmo após fechar e reabrir o aplicativo.

## Objetivo

O projeto foi desenvolvido para praticar os conceitos de:

- `useState`
- Props
- Componentização
- `Pressable`
- `useEffect`
- `AsyncStorage`
- `FlatList`
- `SafeAreaView`
- `Image`

## Funcionalidades

- Adicionar metas acadêmicas;
- Impedir o cadastro de metas vazias;
- Exibir as metas cadastradas;
- Exibir a data de criação de cada meta;
- Remover metas através do `Pressable`;
- Armazenar as metas localmente;
- Recuperar as metas ao abrir novamente o aplicativo.

## Componentização

O projeto foi dividido em componentes para organizar melhor o código.

### MetaInput

Responsável pelo campo de texto e pelo botão de adicionar uma nova meta.

Recebe as seguintes props:

- `value`
- `onChangeText`
- `onAdd`

### MetaList

Responsável pela exibição da lista de metas utilizando `FlatList`.

Recebe as seguintes props:

- `metas`
- `onDelete`

## Persistência com AsyncStorage

O aplicativo utiliza o `AsyncStorage` para armazenar as metas localmente.

Foi utilizada a chave:

```text
@metas_semestre