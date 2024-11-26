import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button, Pressable, ScrollView} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import DBDomain from '../constants/DBDomain.js';
import {useUserContext} from '../context/userContext.js';
import EventoCard from '../components/eventoCard.js';
 
function PanelAdminScreen ({navigation}) {
  const route = useRoute();
  const [eventosProximos, setEventosProximos] = useState([]);
  const [eventosPasados, setEventosPasados] = useState([]);
  const {token, usuario} = useUserContext();
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }

  const fetchEventos = async () => {
    const urlApi = `${DBDomain}/api/event`;
    try {
      const response = await fetch(urlApi, config);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      if (!data) throw new Error('No data returned');

      const now = Date.now();
      const proximos = data.filter(evento => new Date(evento.start_date) > now);
      const pasados = data.filter(evento => new Date(evento.start_date) <= now);

      setEventosProximos(proximos);
      setEventosPasados(pasados);
    } catch (error) {
      console.log('Error fetching eventos', error);
    }
  };

  const eliminarEvento = async (id_event) => {
    const urlApi = `${DBDomain}/api/event/${id_event}`;
    try {
        const response = await fetch(urlApi, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to delete event');

        Alert.alert("Éxito", "Evento eliminado correctamente");
        fetchEventos(); // Refresca el listado
    } catch (error) {
        console.log('Error eliminando evento', error);
    }
  };

  useEffect( async () => {
    setEventosProximos([]);
    setEventosPasados([]);
    const events = await fetchEventos();
  }, []);
  
  useEffect(() => {
    if (route.params?.updateEvents) {
      const reloadEvents = async () => {
        const events = await fetchEventos();
      };
      reloadEvents();
    }
  }, [route.params?.updateEvents]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Eventos Próximos</Text>
      <ScrollView style={styles.scroll}>
        <FlatList
          data={eventosProximos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
          <Pressable onPress={() => navigation.navigate('DetallesEventoAdmin', {id_event: item.id})}>
              <EventoCard evento={item}/>
            </Pressable>
          }
        />
      </ScrollView>

      <Text style={styles.titulo}>Eventos Pasados</Text>
      <ScrollView style={styles.scroll}>
        <FlatList
          data={eventosPasados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) =>
            <EventoCard evento={item}/>
          }
        />
      </ScrollView>
      <Button title="Volver" onPress={() => navigation.navigate('Home')} />
    </View>
  );
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

export default PanelAdminScreen;