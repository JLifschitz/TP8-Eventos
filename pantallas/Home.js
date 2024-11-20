import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, Pressable, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import DBDomain from '../constants/DBDomain.js';
import {useUserContext} from '../context/userContext.js';
import EventoCard from '../components/eventoCard.js';
 
function HomeScreen ({navigation}) {
  const [eventos, setEventos] = useState();
  const {token} = useUserContext();
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }
  
  const fetchEvents = async () => {
    const now = new Date().toISOString();
    const urlApi = `${DBDomain}/api/event?start_date=${now}`;
    try {
      const response = await fetch(urlApi, config);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      if (!data) throw new Error('No data returned');

      return data;
    } catch (error) {
      console.log('Hubo un error en el fetchEvents', error);
    }
  };

  const route = useRoute();

  useEffect( async () => {
    const events = await fetchEvents();
    if (events.length > 0)
    {
      setEventos(events);
    }
  }, []);
  

  useEffect(() => {
    if (route.params?.updateEvents) {
      const reloadEvents = async () => {
        const events = await fetchEvents();
        setEventos(events); // Actualiza los eventos después de la creación
      };
      reloadEvents();
    }
  }, [route.params?.updateEvents]); 

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Eventos</Text>
      <Button title="Cargar nuevo evento" onPress={() => navigation.navigate('Formulario')}/>
      <ScrollView>
        <FlatList
          data={eventos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
            <Pressable onPress={() => navigation.navigate('DetallesEvento', {id_event: item.id})}>
              <EventoCard evento={item}/>
            </Pressable>
          }
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
  },
});

export default HomeScreen;