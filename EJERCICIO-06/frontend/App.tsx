import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Libro = { id: number; titulo: string; autor: string; genero: string, estado_leido: string };
const API_URL = 'http://172.22.28.50:3000';

export default function App() {
  const [libros, setLibros] = useState<Libro[]>([]);

  async function cargar() {
    try {
      const r = await fetch(API_URL + '/libros');
      setLibros(await r.json());
    } catch (error) {
      console.error('Error al cargar libros:', error);
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  function confirmar(libro: Libro) {
    Alert.alert('Eliminar libro', `¿Seguro que deseas eliminar "${libro.titulo}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => eliminar(libro.id) },
    ]);
  }

  async function eliminar(id: number) {
    try {
      await fetch(API_URL + '/libros/' + id, { method: 'DELETE' });
      // Sincronizamos el estado local después de borrar en PostgreSQL.
      setLibros((actuales) => actuales.filter((l) => l.id !== id));
    } catch (error) {
      console.error('Error al eliminar libro:', error);
    }
  }
    
  async function marcarLeido(id: number) {
    try {
      await fetch(`${API_URL}/libros/${id}/leido`, { method: 'PATCH' });

      // Actualizamos el estado local con el texto correspondiente
      setLibros((actuales) =>
        actuales.map((l) => (l.id === id ? { ...l, estado_leido: 'LEIDO' } : l))
      );
    } catch (error) {
      console.error('Error al marcar el libro como leído:', error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>📚 My Library</Text>

      <FlatList
        data={libros}
        keyExtractor={(x) => String(x.id)}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay libros registrados.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.infoContainer}>
              <Text style={styles.bookTitle}>{item.titulo}</Text>
              {item.autor && <Text style={styles.bookSub}>{item.autor}</Text>}
              {item.genero && <Text style={styles.genreBadge}>{item.genero}</Text>}
              {item.genero && <Text style={styles.genreBadge}>{item.estado_leido}</Text>}
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Eliminar"
                color="#dc2626"
                onPress={() => confirmar(item)}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Leido"
                color="#00c3ff"
                onPress={() => marcarLeido(item.id)}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#1f2937',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 3,
  },
  infoContainer: {
    flex: 1,
    marginRight: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  bookSub: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 2,
  },
  genreBadge: {
    fontSize: 12,
    color: '#4f46e5',
    backgroundColor: '#eeef2a20',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 6,
    fontWeight: '500',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 40,
    fontSize: 15,
  },
});