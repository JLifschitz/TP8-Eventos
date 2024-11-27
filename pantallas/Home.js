import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, Pressable, ScrollView} from 'react-native';
import { useNavigation, useRoute, useFocusEffect} from '@react-navigation/native';
import DBDomain from '../constants/DBDomain.js';
import {useUserContext} from '../context/userContext.js';
import EventoCard from '../components/eventoCard.js';
 
function HomeScreen ({navigation}) {
  const route = useRoute();
  const [eventos, setEventos] = useState();
  const {token, usuario} = useUserContext();
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

  useEffect( async () => {
    setEventos([]);
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
        setEventos(events);
      };
      reloadEvents();
    }
  }, [route.params?.updateEvents]);

  useFocusEffect(
    React.useCallback(() => {
      // Esto asegura que los datos se vuelvan a cargar cuando la pantalla se enfoque
      fetchEvents();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Eventos</Text>
      <ScrollView style={styles.scroll}>
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
      <Button style={styles.boton} title="Cargar nuevo evento" onPress={() => navigation.navigate('Formulario')}/>
      {usuario.id === 71 ? (
        <Button style={styles.boton} title="Ver todos los eventos" onPress={() => navigation.navigate("PanelAdmin")} />
      ) : null}
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
  scroll: {
    height: 100,
  },
  titulo: {
    fontSize: 20,
  },
  boton: {
    marginTop: 5,
  },
});

export default HomeScreen;