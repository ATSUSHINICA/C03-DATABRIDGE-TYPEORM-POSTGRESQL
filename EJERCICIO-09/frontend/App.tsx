import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Evento = { id: number; nombre: string; ciudad: string; categoria: string; fecha: string };
const API_URL = 'http://192.168.1.19:3000';

export default function App() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [ciudad, setCiudad] = useState('');
  const [categoria, setCategoria] = useState('');

  async function cargar() {
    try {
      const params: string[] = [];
      if (ciudad) params.push('ciudad=' + ciudad);
      if (categoria) params.push('categoria=' + categoria);
      const query = params.length ? '?' + params.join('&') : '';

      const r = await fetch(API_URL + '/eventos' + query);
      if (!r.ok) {
        throw new Error('No se pudo cargar el evento');
      }
      const data = await r.json();
      setEventos(data);
    } catch (error) {
      console.error('Error al cargar:', error);
    }
  }

  useEffect(() => {
    cargar();
  }, [ciudad, categoria]);

  function filtrarCiudad() {
    setCiudad(ciudad ? '' : 'Zaragoza');
  }

  function filtrarCategoriaTech() {
    setCategoria(categoria ? '' : 'Tecnologia');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>🎟️ Event Radar</Text>
      <Text style={styles.subtitulo}>Descubre eventos cerca de ti</Text>

      <View style={styles.filtros}>
        <Pressable
          onPress={filtrarCiudad}
          style={({ pressed }) => [
            styles.filtro,
            ciudad !== '' && styles.filtroActivo,
            pressed && styles.filtroPresionado,
          ]}
        >
          <Text style={styles.filtroTexto}>📍 Zaragoza</Text>
        </Pressable>

        <Pressable
          onPress={filtrarCategoriaTech}
          style={({ pressed }) => [
            styles.filtro,
            categoria !== '' && styles.filtroActivo,
            pressed && styles.filtroPresionado,
          ]}
        >
          <Text style={styles.filtroTexto}>Tecnologia</Text>
        </Pressable>
      </View>

      <FlatList
        data={eventos}
        keyExtractor={(x) => String(x.id)}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={<Text style={styles.vacio}>No hay eventos</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardCabecera}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>{item.categoria}</Text>
              </View>
            </View>
            <Text style={styles.ciudad}>📍 {item.ciudad}</Text>
            <Text style={styles.fecha}>📅 {item.fecha}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f9',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitulo: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 20,
  },
  filtro: {
    alignSelf: 'flex-start',
    backgroundColor: '#4f46e5',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    marginBottom: 20,
    opacity: 0.55,
  },
  filtroActivo: {
    opacity: 1,
  },
  filtroPresionado: {
    opacity: 0.7,
  },
  filtroTexto: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 15,
  },
  lista: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3, // sombra en Android
  },
  cardCabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  nombre: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#e0e7ff',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeTexto: {
    color: '#4338ca',
    fontSize: 12,
    fontWeight: '600',
  },
  ciudad: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 4,
  },
  fecha: {
    fontSize: 14,
    color: '#4b5563',
  },
  vacio: {
    textAlign: 'center',
    color: '#9ca3af',
    marginTop: 40,
    fontSize: 16,
  },

  filtros: {
    flexDirection: 'row',
    gap: 15,
  },
});