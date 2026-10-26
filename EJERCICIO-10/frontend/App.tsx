import { useEffect,useState } from 'react';
import { Button,FlatList,Platform,SafeAreaView,StatusBar,StyleSheet,Text,TextInput,View } from 'react-native';

type Destino={id:number;ciudad:string;pais:string;descripcion:string;presupuesto?:number}; // NUEVO: presupuesto
const API_URL='http://192.168.1.19:3000';

export default function App(){
 const [destinos,setDestinos]=useState<Destino[]>([]);
 const [ciudad,setCiudad]=useState('');
 const [pais,setPais]=useState('');
 const [presupuesto,setPresupuesto]=useState(''); // NUEVO
 const [error,setError]=useState('');

 async function request(url:string,options?:RequestInit){
   const r=await fetch(url,options);
   if(!r.ok) throw new Error('HTTP '+r.status);
   return r;
 }

 async function cargar(){
   try{
     const r=await request(API_URL+'/destinos');
     setDestinos(await r.json());
     setError('');
   }catch{setError('No se pudieron cargar los destinos.');}
 }
 useEffect(()=>{cargar();},[]);

 async function crear(){
   try{
     await request(API_URL+'/destinos',{
       method:'POST',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({
         ciudad,
         pais,
         descripcion:'Nuevo destino',
         presupuesto:Number(presupuesto.replace(',','.'))||0, // NUEVO
       }),
     });
     setCiudad('');
     setPais('');
     setPresupuesto(''); // NUEVO
     await cargar();
   }catch{setError('No se pudo crear.');}
 }

 async function editar(id:number){
   try{
     await request(API_URL+'/destinos/'+id,{
       method:'PATCH',
       headers:{'Content-Type':'application/json'},
       body:JSON.stringify({descripcion:'Destino actualizado'}),
     });
     await cargar();
   }catch{setError('No se pudo actualizar.');}
 }

 async function eliminar(id:number){
   try{
     await request(API_URL+'/destinos/'+id,{method:'DELETE'});
     await cargar();
   }catch{setError('No se pudo eliminar.');}
 }

 return <SafeAreaView style={s.pantalla}>
   <View style={s.contenedor}>
     <Text style={s.titulo}>🌍 Wander</Text>
     {error!==''&&<Text style={s.error}>{error}</Text>}

     <View style={s.card}>
       <TextInput style={s.input} placeholder="Ciudad" placeholderTextColor="#9aa1ad" value={ciudad} onChangeText={setCiudad}/>
       <TextInput style={s.input} placeholder="País" placeholderTextColor="#9aa1ad" value={pais} onChangeText={setPais}/>
       <TextInput style={s.input} placeholder="Presupuesto (€)" placeholderTextColor="#9aa1ad" keyboardType="numeric" value={presupuesto} onChangeText={setPresupuesto}/>{/* NUEVO */}
       <Button title="Crear destino" color="#1b2230" onPress={crear}/>
     </View>

     <FlatList
       data={destinos}
       keyExtractor={x=>String(x.id)}
       renderItem={({item})=><View style={s.card}>
         <Text style={s.cardTitulo}>🌍 {item.ciudad}</Text>
         <Text style={s.cardSubtitulo}>{item.pais} · {item.descripcion}</Text>
         <Text style={s.presupuesto}>Presupuesto: {item.presupuesto??0} €</Text>{/* NUEVO */}
         <View style={s.botones}>
           <Button title="Editar" color="#1b2230" onPress={()=>editar(item.id)}/>
           <Button title="Eliminar" color="#b42318" onPress={()=>eliminar(item.id)}/>
         </View>
       </View>}
     />
   </View>
 </SafeAreaView>;
}

const s=StyleSheet.create({
 pantalla:{flex:1,backgroundColor:'#f8f9fb',paddingTop:Platform.OS==='android'?(StatusBar.currentHeight??0):0},
 contenedor:{flex:1,padding:20},
 titulo:{fontSize:22,fontWeight:'700',color:'#1b2230',marginBottom:16},
 error:{fontSize:13,color:'#b42318',backgroundColor:'#fef3f2',borderWidth:1,borderColor:'#fecdca',borderRadius:14,padding:12,marginBottom:12},
 card:{backgroundColor:'#ffffff',borderWidth:1,borderColor:'#e4e7ec',borderRadius:14,paddingHorizontal:16,paddingVertical:14,marginBottom:12},
 input:{height:44,borderWidth:1,borderColor:'#e4e7ec',borderRadius:10,paddingHorizontal:12,marginBottom:10,fontSize:14,color:'#1b2230',backgroundColor:'#f8f9fb'},
 cardTitulo:{fontSize:15,fontWeight:'700',color:'#1b2230'},
 cardSubtitulo:{fontSize:12,color:'#6b7280',marginTop:4},
 presupuesto:{fontSize:13,fontWeight:'600',color:'#1b2230',marginTop:8},
 botones:{flexDirection:'row',gap:8,marginTop:12},
});