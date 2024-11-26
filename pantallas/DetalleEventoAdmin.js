import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Alert } from 'react-native';
import DBDomain from '../constants/DBDomain.js';
import {useUserContext} from '../context/userContext.js';

function DetalleEventoAdminScreen ({ navigation, route }) {
    const {usuario} = useUserContext();
    const { id_event } = route.params;
    const [evento, setEvento] = useState();
    const [participantes, setParticipantes] = useState([]);

    const fetchEvento = async () => {
        const urlApi = `${DBDomain}/api/event/${id_event}`;
        try {
            const response = await fetch(urlApi);
            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();
            setEvento(data);
        } catch (error) {
            console.log('Error fetching evento', error);
        }
    };

    const fetchParticipantes = async () => {
        const urlApi = `${DBDomain}/api/event/${id_event}/enrollment`;
        try {
            const response = await fetch(urlApi);
            if (!response.ok) throw new Error('Failed to fetch data');

            const data = await response.json();
            setParticipantes(data);
        } catch (error) {
            console.log('Error fetching participantes', error);
        }
    };

    const DeleteEvento = async () => {
        const urlApi = `${DBDomain}/api/event/${id_event}`;
        try {
            const response = await fetch(urlApi, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete event');

            Alert.alert("Éxito", "Evento eliminado correctamente");
            navigation.goBack();
        } catch (error) {
            console.log('Error eliminando evento', error);
        }
    };

    const eliminarEvento = async () =>
    {
      const data = await DeleteEvento();
      navigation.navigate('PanelAdmin');
    }

    useEffect(() => {
        fetchEvento();
        fetchParticipantes();
    }, []);

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
            </View>
            <FlatList
                data={participantes}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                keyExtractor={item => item.id.toString()}
            />
            <Button title="Editar Evento" onPress={() => navigation.navigate('EditarEvento')} />
            <Button title="Eliminar Evento" onPress={eliminarEvento} />
            <Button title="Volver" onPress={() => navigation.navigate('PanelAdmin')} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
});

export default DetalleEventoAdminScreen;
