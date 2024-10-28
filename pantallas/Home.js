import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
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
    const urlApi = `${DBDomain}/api/event?start_date=${Date.now()}`;
    try {
      const response = await fetch(urlApi, config);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      if (!data) throw new Error('No data returned');

      console.log('data: ', data);
      return data;
    } catch (error) {
      console.log('Hubo un error en el fetchEvents', error);
    }
  };

  useEffect( async () => {
    const events = await fetchEvents();
    if (events.length > 0) setEventos(events)
  }, []);

  return (
    <View style={styles.container}>
      <Text>Bienvenido</Text>
      <View>
        <Button title="Cargar nuevo evento" onPress={() => navigation.navigate('Formulario')}/>
        <FlatList
          data={eventos}
          renderItem={({item}) =>
            <Pressable onPress={() => navigation.navigate('DetallesEvento', {id_event: item.id})}>
              <EventoCard props={item}/>
            </Pressable>
          }
        />
      </View>
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
  logo: {
    
  },
});

export default HomeScreen;