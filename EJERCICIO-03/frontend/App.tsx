import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Mascota = {
  id: number;
  nombre: string;
  raza: string;
  edad: number;
  ciudad: string;
  energia: string;
};

const API_URL = 'http://172.22.28.50:3000';

export default function App() {
  const [mascota, setMascota] = useState<Mascota | null>(null);

  useEffect(() => {
    fetch(API_URL + '/mascotas/1')
      .then((r) => r.json())
      .then((dato: Mascota) => setMascota(dato));
  }, []);

  if (!mascota) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Cargando...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>PET PROFILE · DESPUÉS DEL RETO</Text>
      <Text style={styles.name}>{mascota.nombre}</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.emoji}>🐶</Text>
          <Text style={styles.title}>{mascota.raza}</Text>
        </View>
        <Text style={styles.info}>
          {mascota.edad} años · {mascota.ciudad}
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.emoji}>⚡</Text>
          <Text style={styles.title}>Nivel de energía: {mascota.energia}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  label: {
    fontSize: 12,
    letterSpacing: 0.4,
    color: '#1f2937',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginTop: 16,
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 18,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  info: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
});