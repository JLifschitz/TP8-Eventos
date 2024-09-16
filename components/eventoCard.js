import * as React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const EventoCard = ({props}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>{props.name}</Text>
        <Text>Descripción: {props.description}</Text>
        <Text>categorias:</Text>
        <FlatList
            data={props.Category}
            renderItem={({item}) => <Text>{item.name}</Text>}
        />
        <Text>lugar:</Text>
        <FlatList
            data={props.Ubication}
            renderItem={({item}) => <Text>{item.item}</Text>}
        />
        <Text>Fecha: {props.start_date}</Text>
        <Text>Duracion: {props.duration_in_minutes}</Text>
        <Text>Precio: {props.price}</Text>
        <Text>Cupos disponibles: {props.enabled_for_enrollment}</Text>
        <Text>Cantidad maxima de personas: {props.max_assistance}</Text>
        <Text>Creador: {props.User.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    titulo: {
      width: 100,
      height: 100,
    },
});

export default EventoCard;