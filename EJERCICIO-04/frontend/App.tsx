import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
const API_URL = 'http://172.22.28.50:3000';

export default function App() {
  const [nombre,setNombre]=useState('');
  const [tipo,setTipo]=useState('');
  const [ciudad,setCiudad]=useState('');
  const [mensaje,setMensaje]=useState('');
  const [precioMedio,setPrecioMedio]=useState('');
  async function guardar() {
    const respuesta=await fetch(API_URL+'/restaurantes',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        nombre,
        tipo,
        ciudad,
        puntuacion:9,
        precioMedio
      }),
    });

    setMensaje(respuesta.ok?'Restaurante guardado ✓':'Error al guardar');
  }

  return <SafeAreaView style={styles.container}>
    <Text style={styles.title}>🍜 Food Spots</Text>
    <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre}/>
    <TextInput style={styles.input} placeholder="Tipo" value={tipo} onChangeText={setTipo}/>
    <TextInput style={styles.input} placeholder="Ciudad" value={ciudad} onChangeText={setCiudad}/>
    <TextInput style={styles.input} placeholder="Precio Medio" value={precioMedio} onChangeText={setPrecioMedio}/>
    <Button title="Guardar restaurante" onPress={guardar}/>
    <Text>{mensaje}</Text>
  </SafeAreaView>;
}
const styles=StyleSheet.create({
 container:{flex:1,padding:24,backgroundColor:'#FFF7ED'},
 title:{fontSize:30,fontWeight:'800',marginBottom:20},
 input:{backgroundColor:'#FFF',padding:14,borderRadius:12,marginBottom:12}
});