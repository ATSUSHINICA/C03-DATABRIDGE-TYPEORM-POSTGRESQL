import { useEffect, useState,  } from 'react';
import { FlatList,StyleSheet,Text, View, Button } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Cancion={id:number;titulo:string;artista:string};
type Playlist={id:number;nombre:string;canciones:Cancion[]};
const API_URL='http://192.168.1.19:3000';

export default function App(){
 const [playlist,setPlaylist]=useState<Playlist|null>(null);

 async function cargar(){
   const r=await fetch(API_URL+'/playlists/1');
   setPlaylist(await r.json());
 }
 useEffect(()=>{cargar();},[]);

async function crearCancion(titulo: string, artista: string, playlist: Playlist) {
  try {
    await fetch(API_URL + '/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo: titulo,
        artista: artista,
        playlistId: playlist.id, // Vincula la canción con la ID de la playlist padre
      }),
    });
    
    // Recarga los datos de la playlist para que se actualice la pantalla con la nueva canción
    await cargar(); 
  } catch {
    console.error('Error al crear la canción.');
  }
}

 if(!playlist)return <Text>Cargando...</Text>;

 return (
 <SafeAreaView style={styles.container}>
    <Text style={styles.despuesReto}>MY PLAYLIST DESPUÉS DEL RETO</Text>
   <Text style={styles.playlist}>🎵 {playlist.nombre}</Text>

   <FlatList data={playlist.canciones} keyExtractor={x=>String(x.id)}
     renderItem={({item})=><View style ={styles.canciones}>

        <Text style={styles.textoMusica}>{item.titulo}</Text>
        <Text style={styles.textoPlaylist}>{item.artista}</Text>

      </View>}/>
      <View style={styles.buttonContainer}>
        <Button 
          title="+ Añadir canción" 
          color="#2563eb" 
          onPress={() => crearCancion('Midnight City', 'M83', playlist)} 
        />
      </View>


 </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  despuesReto:{
    fontSize: 17,
    marginBottom: 30
  },

  playlist:{
    fontSize: 30,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  canciones:{
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    margin: 10
  },

  textoMusica:{
    fontSize: 20,
    marginBottom: 15
  },

  textoPlaylist:{
    color: '#5e5d5d',

  },

  buttonContainer: {
    marginVertical: 20,
  },
});