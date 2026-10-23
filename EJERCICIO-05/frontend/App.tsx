
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const API_URL = 'http://172.22.28.50:3000';

export default function App() {
  const [estado, setEstado] = useState('RESERVADO');
  const [mensaje, setMensaje] = useState('');
  const [guardando, setGuardando] = useState(false);

  async function actualizar() {
    try {
      setGuardando(true);
      setMensaje('');

      const r = await fetch(`${API_URL}/viajes/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado }),
      });

      setMensaje(
        r.ok ? 'Viaje actualizado ✓' : 'No se pudo actualizar',
      );
    } catch {
      setMensaje('Error de conexión con el servidor');
    } finally {
      setGuardando(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#111827"
      />

      <View style={styles.phone}>
        {/* Barra superior */}
        <View style={styles.notch} />

        {/* Pantalla */}
        <View style={styles.screen}>
          <Text style={styles.subtitle}>
            TRAVEL BOOK · DESPUÉS DEL RETO
          </Text>

          <Text style={styles.title}>Editar viaje</Text>

          {/* Destino */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>✈️ Tokio</Text>
            <Text style={styles.description}>
              Japón · RESERVADO
            </Text>
          </View>

          {/* Fecha */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              🗓️ Fecha: 10/04/2027
            </Text>
          </View>

          {/* Estado editable */}
          <TextInput
            style={styles.input}
            value={estado}
            onChangeText={setEstado}
            placeholder="Estado del viaje"
            placeholderTextColor="#94A3B8"
            autoCapitalize="characters"
          />

          {/* Guardar */}
          <TouchableOpacity
            style={[
              styles.button,
              guardando && styles.buttonDisabled,
            ]}
            onPress={actualizar}
            disabled={guardando}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </Text>
          </TouchableOpacity>

          {mensaje !== '' && (
            <Text style={styles.message}>{mensaje}</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  phone: {
    width: 236,
    height: 544,
    backgroundColor: '#111827',
    borderRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },

  notch: {
    width: 55,
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 11,
  },

  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingTop: 18,
  },

  subtitle: {
    fontSize: 9,
    color: '#374151',
    marginBottom: 25,
  },

  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#172033',
    marginBottom: 17,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE4EF',
    borderRadius: 11,
    padding: 10,
    marginBottom: 8,
    minHeight: 44,
    justifyContent: 'center',
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#243047',
  },

  description: {
    fontSize: 9,
    color: '#64748B',
    marginTop: 5,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE4EF',
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 7,
    fontSize: 11,
    color: '#243047',
    marginBottom: 8,
  },

  button: {
    backgroundColor: '#2860F0',
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },

  message: {
    fontSize: 10,
    color: '#334155',
    marginTop: 8,
    textAlign: 'center',
  },
});
