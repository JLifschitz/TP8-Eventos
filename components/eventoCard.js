import * as React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const EventoCard = ({evento}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>{evento.name}</Text>
        <Text>Descripción: {evento.description}</Text>
        <Text>Categoria: {evento.category.name}</Text>
        <Text>Ubicacion: {evento.ubication.full_address}</Text>
        <Text>Fecha: {evento.start_date}</Text>
        <Text>Duracion: {evento.duration_in_minutes}</Text>
        <Text>Precio: {evento.price}</Text>
        <Text>Cupos disponibles: {evento.enabled_for_enrollment}</Text>
        <Text>Cantidad maxima de personas: {evento.max_assistance}</Text>
        <Text>Creador: {evento.user.first_name} {evento.user.last_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
  }
});

export default EventoCard;