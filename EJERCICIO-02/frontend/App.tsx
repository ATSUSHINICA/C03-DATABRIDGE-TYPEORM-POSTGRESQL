import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Pelicula = {
  id: number;
  titulo: string;
  genero: string;
  anio: number;
  puntuacion: number;
  favorita: boolean
};

const API_URL = 'http://172.22.28.50:3000';

export default function App() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(API_URL + '/peliculas')
      .then((respuesta) => respuesta.json())
      .then((datos: Pelicula[]) => setPeliculas(datos))
      .catch(() => setError('No se pudo conectar con el servidor'))
      .finally(() => setCargando(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎬 CineBox</Text>

      {cargando && <ActivityIndicator size="large" color="#fff" />}
      {error !== '' && <Text style={styles.error}>{error}</Text>}

      <FlatList
        data={peliculas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.movie}>{item.titulo}</Text>
            <Text style={styles.info}>{item.genero} · {item.anio}</Text>
            <Text style={styles.score}>⭐ {Number(item.puntuacion).toFixed(1)}</Text>
            <Text style={styles.corazon}>{item.favorita ? '♥' : '♡'}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141414', padding: 20 },
  title: { fontSize: 30, fontWeight: '800', color: '#ffffff', marginBottom: 16 },
  card: { backgroundColor: '#2a2a2a', padding: 18, borderRadius: 16, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: '#e50914' },
  movie: { fontSize: 18, fontWeight: '700', color: '#ffffff' },
  info: { fontSize: 14, color: '#b3b3b3', marginTop: 4 },
  score: { fontSize: 16, fontWeight: '600', color: '#ffd54a', marginTop: 8 },
  error: { color: '#ff6b6b', fontSize: 16, marginBottom: 12 },
  corazon: { fontSize: 26, color: '#e50914' },
});