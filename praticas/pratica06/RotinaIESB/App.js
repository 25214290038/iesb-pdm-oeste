import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as labels from './labels';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {

  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);

  useEffect(() => {
    const carregarCompromissos = async () => {
      try {
        const dados = await AsyncStorage.getItem(STORAGE_KEY);

        if (dados) {
          setCompromissos(JSON.parse(dados));
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar os compromissos salvos.'
        );
      }
    };

    carregarCompromissos();
  }, []);

  useEffect(() => {
    const salvarCompromissos = async () => {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(compromissos)
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar os compromissos.'
        );
      }
    };

    salvarCompromissos();
  }, [compromissos]);


  const adicionarCompromisso = () => {

    if (texto.trim() === '') {
      Alert.alert(
        'Atenção',
        'Digite um compromisso antes de adicionar.'
      );
      return;
    }


    const novoCompromisso = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toLocaleString('pt-BR'),
    };

    setCompromissos((listaAtual) => [
      ...listaAtual,
      novoCompromisso,
    ]);

    setTexto('');
  };

  const removerCompromisso = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id)
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* CABEÇALHO */}
        <View style={styles.header}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
          />

          <Text style={styles.title}>
            {labels.tituloApp}
          </Text>
        </View>

        {/* ÁREA DE CADASTRO */}
        <CompromissoInput
          value={texto}
          onChangeText={setTexto}
          onAdd={adicionarCompromisso}
          labels={labels}
        />

        {/* LISTA DE COMPROMISSOS */}
        <CompromissoList
          itens={compromissos}
          onDelete={removerCompromisso}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo
: {
    width: 40,
    height: 40,
    marginRight: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 