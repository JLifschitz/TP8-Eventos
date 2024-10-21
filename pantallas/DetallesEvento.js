import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button} from 'react-native';
import EventoCard from '../components/eventoCard.js';
 
function DetallesEventoScreen ({navigation, id_event}) {
    const [evento, setEvento] = useState();
    
    const fetchEvents = async () => {
        const urlApi = `${DBDomain}/api/event/${id_event}`;
        try {
        const response = await fetch(urlApi);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        if (!data) throw new Error('No data returned');

        console.log('data: ', data);
        return data;
        } catch (error) {
        console.log('Hubo un error en el fetchEvents', error);
        }
    };

    const inscribirse = async () => {
        const urlApi = `${DBDomain}/api/event/${id_event}/enrollment`;
        try {
            const response = await fetch(urlApi, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_event: id_event,
                id_user: id_user,
                description: '',
                attended: false,
                observations: '',
                rating: '',
              }),
            });
      
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
      
            const data = await response.json();
            if (!data) {
              throw new Error('No data returned');
            }
      
            return data;
          } catch (error) {
            console.log('Hubo un error en el login ', error);
          }
    }

    useEffect( async () => {
        const event = await fetchEvents();
        if (event.lentgh > 0) setEvento(event)
    }, []);

    return (
        <View style={styles.container}>
            <Text>{evento.name}</Text>
            <View>
                <Text>{evento.description}</Text>
                <Text>Empieza: {evento.start_date}</Text>
                <Text>Duracion: {evento.duration_in_minutes}</Text>
                <Text>Precio: {evento.price}</Text>
                <Text>Location: {evento.Location}</Text>
                <Text>Categoria: {evento.Category}</Text>
                <Text>Tags: {evento.Tags}</Text>
                <Button title="Inscribirse" onPress={() => inscribirse()}/>
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

export default DetallesEventoScreen;