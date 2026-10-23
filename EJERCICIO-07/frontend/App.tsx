import { useEffect,useState } from 'react';
import { Button,FlatList,Text,View, StyleSheet } from 'react-native';
import { useSafeAreaInsets,SafeAreaView } from 'react-native-safe-area-context';

type Sneaker={id:number;marca:string;modelo:string;precio:number;talla:number; stock:number};
const API_URL='http://172.22.28.50:3000';

export default function App(){
 const [items,setItems]=useState<Sneaker[]>([]);
 const [error,setError]=useState('');

 async function request(url:string,options?:RequestInit){
   const r=await fetch(url,options);
   if(!r.ok) throw new Error('HTTP '+r.status);
   return r;
 }

 async function cargar(){
   try{
     const r=await request(API_URL+'/sneakers');
     setItems(await r.json());
     setError('');
   }catch{
     setError('No se pudo conectar con la API.');
   }
 }
 useEffect(()=>{cargar();},[]);

 async function crear(){
   try{
     await request(API_URL+'/sneakers',{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({
         marca:'Nike',
         modelo:'Air Max 1',
         precio:149.99,
         talla:42,
         stock: 0
       }),
     });
     await cargar();
   }catch{setError('Error al crear.');}
 }

 async function rebajar(id:number){
   try{
     await request(API_URL+'/sneakers/'+id,{
       method:'PATCH',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({precio:139.99}),
     });
     await cargar();
   }catch{setError('Error al actualizar.');}
 }

 async function eliminar(id:number){
   try{
     await request(API_URL+'/sneakers/'+id,{method:'DELETE'});
     await cargar();
   }catch{setError('Error al eliminar.');}
 }


 return (
 <SafeAreaView style={styles.fondo}>
   <Text style={styles.titulo}>👟 Sneaker Vault</Text>

   {error!==''&&<Text>{error}</Text>}

   <Button title="Nueva" onPress={crear} />
   <FlatList
     data={items}
     keyExtractor={x=>String(x.id)}
     renderItem={({item})=><View style={styles.zapatilla}>

       <Text style={styles.textoZapatilla}>{item.modelo}</Text>
       <Text style={styles.descripcion}>{item.marca} · Talla: {item.talla} ·  {item.stock > 0 ? `STOCK ${item.stock}` : 'AGOTADO'} </Text>
       <Text style={styles.precio}>{Number(item.precio).toFixed(2)} €</Text>
      <View style={styles.botones}>
        <Button title="Rebajar" onPress={()=>rebajar(item.id)}/>
        <Button title="Eliminar" onPress={()=>eliminar(item.id)}/>
      </View>
     </View>
     }
     
   />
 </SafeAreaView>);
}

const styles = StyleSheet.create({
  fondo:{
    backgroundColor: '#f0eeee',
    flex: 1,
    paddingTop: 20

  },
  titulo:{
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    fontWeight: 700,
    fontSize: 30
  },

  zapatilla:{
    backgroundColor: '#ffffff',
    margin: 30,
    padding: 20,
    borderRadius: 20,
    
  },

  textoZapatilla:{
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,  
  },

  descripcion:{
    color: '#888888',
    marginBottom: 10,

  },

  precio:{
    fontSize: 25,
    fontWeight:'800',
    marginBottom: 20,
  },

  botones: {
    flexDirection: 'row', // Coloca los botones uno al lado del otro
    justifyContent: 'center', // Los centra horizontalmente
    alignItems: 'center', // Los alinea verticalmente
    gap: 50, // Espacio entre los botones (si usas una versión reciente de React Native)
  },

});