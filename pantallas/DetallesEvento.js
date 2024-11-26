import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Alert } from 'react-native';
import DBDomain from '../constants/DBDomain.js';
import {useUserContext} from '../context/userContext.js';

function DetallesEventoScreen({ navigation, route }) {
  const [evento, setEvento] = useState(null); // Cambiado a `null` para controlar mejor el estado de carga
  const { id_event } = route.params;
  const {token, usuario} = useUserContext();
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }

  const fetchEvento = async () => {
    const urlApi = `${DBDomain}/api/event/${id_event}`;
    try {
      const response = await fetch(urlApi);
      if (!response.ok) throw new Error('Failed to fetch data');
      
      const data = await response.json();
      if (!data) throw new Error('No data returned');

      return data;
    } catch (error) {
      console.log('Hubo un error en el fetchEvent', error);
    return null;
    }
  };

  const createEnrollment = async () => {
    const urlApi = `${DBDomain}/api/event/${id_event}/enrollment`;
    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id_event: id_event,
          id_user: usuario.id,
          description: '',
          attended: 0,
          observations: '',
          rating: '',
        }),
      });
      if (!response.ok) throw new Error('Failed to enroll in event');

      const data = await response.json();
      if (!data) throw new Error('No data returned');
      alert('inscripcion realizada con exito'); // Mostrar mensaje de éxito
    
      return data;
    } catch (error) {
      console.log('Hubo un error al inscribirse', error);
      Alert.alert("Error al inscribirse");
    }
  };

  const inscribirse = async () =>
  {
    const data = await createEnrollment();
    navigation.navigate('Home');
  }

  useEffect(() => {
    const fetchAndSetEvent = async () => {
      const event = await fetchEvento();
      if (event) {
        setEvento(event); // Asigna el evento al estado
      }
    };

    fetchAndSetEvent();
  }, [id_event]);

  if (!evento) {
    return <Text>Cargando...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Text>{evento.name}</Text>
        <View>
          <Text>{evento.description}</Text>
          <Text>Empieza: {evento.start_date}</Text>
          <Text>Duración: {evento.duration_in_minutes} minutos</Text>
          <Text>Precio: {evento.price}</Text>
          <Text>Ubicación: {evento.Location.name}</Text>
          <Text>Direccion: {evento.Location.full_address}</Text>
          <Text>Categoría: {evento.Category.name}</Text>
          <Text>Tags: {evento.Tags.name}</Text>
          <Button title="Inscribirse" onPress={inscribirse} />
        </View>
        <Button title="Volver" onPress={() => navigation.navigate('Home')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  },
});
  
export default DetallesEventoScreen;