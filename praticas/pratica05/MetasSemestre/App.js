import { useEffect, useState } from 'react';

import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import MetaInput from './componentes/MetaInput';
import MetaList from './componentes/MetaList';

const CHAVE_METAS = '@metas_semestre';

export default function App() {
  const [texto, setTexto] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);


  useEffect(() => {
    async function carregarMetas() {
      try {
        const dados = await AsyncStorage.getItem(CHAVE_METAS);

        if (dados !== null) {
          setMetas(JSON.parse(dados));
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar as metas salvas.'
        );
      } finally {
        setCarregando(false);
      }
    }

    carregarMetas();
  }, []);


  useEffect(() => {
    if (carregando) {
      return;
    }

    async function salvarMetas() {
      try {
        await AsyncStorage.setItem(
          CHAVE_METAS,
          JSON.stringify(metas)
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar as metas.'
        );
      }
    }

    salvarMetas();
  }, [metas, carregando]);


function adicionarMeta() {
  const textoLimpo = texto.trim();

  if (textoLimpo === '') {
    if (Platform.OS === 'web') {
      window.alert('Digite uma meta antes de adicionar.');
    } else {
      Alert.alert(
        'Atenção',
        'Digite uma meta antes de adicionar.'
      );
    }

    return;
  }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadaEm: new Date().toLocaleString('pt-BR'),
    };

    setMetas((metasAtuais) => [
      ...metasAtuais,
      novaMeta,
    ]);

    setTexto('');
  }


  function removerMeta(id) {
    setMetas((metasAtuais) =>
      metasAtuais.filter((meta) => meta.id !== id)
    );
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* CABEÇALHO */}
          <View style={styles.header}>

            <Image
              source={require('./assets/imagem.webp')}
              style={styles.image}
            />

            <View>
              <Text style={styles.title}>
                MetasSemestre
              </Text>

              <Text style={styles.subtitle}>
                Minhas metas acadêmicas
              </Text>
            </View>

          </View>

          {/* CAMPO PARA DIGITAR META */}
          <MetaInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarMeta}
          />

          {/* LISTA DE METAS */}
          <MetaList
            metas={metas}
            onDelete={removerMeta}
          />

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});