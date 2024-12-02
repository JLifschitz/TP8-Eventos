import React, { FC, useEffect, useState, useMemo } from 'react';
import { StyleSheet, Button, View, Text, Modal, Dimensions, ScrollView } from 'react-native';
import {useUserContext} from '../context/userContext.js';
import {useNavigation} from '@react-navigation/native';
import DBDomain from '../constants/DBDomain.js';
import Success from './Success';


const ConfirmacionModal = ({visible, setVisible, newEvent, OnPressNavigation}) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const tamanoFuente = windowWidth / 14;
  const {token, usuario} = useUserContext();

  function cerrarModal() {
    setVisible(false);
  }

  const createEventPost = async () => {
    const urlApi = `${DBDomain}/api/event`;
    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newEvent.name,
          description: newEvent.description,
          id_event_category: newEvent.id_event_category,
          id_event_location: newEvent.id_event_location,
          start_date: newEvent.start_date,
          duration_in_minutes: newEvent.duration_in_minutes,
          price: newEvent.price,
          enable_for_enrollment: true,
          max_assistance: newEvent.max_assistance,
          id_creator_user: newEvent.id_creator_user,
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
      console.log('Hubo un error en el crear evento', error);
    }
  };

  const crearEvento = async () => {
    const data = await createEventPost();
    if (data) {
      cerrarModal();
      alert(Success);
      OnPressNavigation();
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text>¿Estas seguro?</Text>
          </View>
            <Text>Nombre: {newEvent.name}</Text>
            <Text>Descripción: {newEvent.description}</Text>
            <Text>Categoría: {newEvent.id_event_category}</Text>
            <Text>Ubicación: {newEvent.id_event_location}</Text>
            <Text>Fecha de Inicio: {newEvent.start_date}</Text>
            <Text>Duración: {newEvent.duration_in_minutes}</Text>
            <Text>Precio: {newEvent.price}</Text>
            <Text>Máxima asistencia: {newEvent.max_assistance}</Text>
            <Text>Estado de Inscripción: {true ? 'Habilitada' : 'Deshabilitada'}</Text>
          <View style={styles.botonesContainer}>
            <Button title="Confirmar" onPress={crearEvento}/>
            <Button title="Cancelar" onPress={cerrarModal}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    card: {
        width: '83%',
        height: '40%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    contactList: {
        width: '100%',
        flex: 1,
    },
    contactListContent: {
        alignItems: 'center',
    },
    contactContainer: {
        width: '100%',
        alignItems: 'center',
    },
    header: {
        marginBottom: 20,
    },
    botonesContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        justifyContent: 'space-around',
    },
});

export default ConfirmacionModal;