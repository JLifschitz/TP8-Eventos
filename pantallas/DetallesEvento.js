import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Button} from 'react-native';
import EventoCard from '../components/eventoCard.js';
 
function DetallesEventoScreen ({navigation, id_event}) {
    const [evento, setEvento] = useState();
    const urlApi = `${DBDomain}/api/event${id_event}`;

    const fetchEvents = async () => {
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

    useEffect( async () => {
        const event = await fetchEvents();
        if (event.lentgh > 0) setEvento(event)
    }, []);

    return (
        <View style={styles.container}>
        <Text>Bienvenido</Text>
        <View>
            <Button title="Cargar nuevo evento" onPress={() => navigation.navigate('Formulario')}/>
            <FlatList
                data={eventos}
                renderItem={({item}) => <EventoCard props={item}/>}
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

export default DetallesEventoScreen;