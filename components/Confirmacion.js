import React, { FC, useEffect, useState, useMemo } from 'react';
import { StyleSheet, Button, View, Text, Modal, Dimensions, ScrollView } from 'react-native';
import DBDomain from '../constants/DBDomain.js';
import Success from './Success';


const ConfirmacionModal = ({visible, setVisible, newEvent}) => {
  const windowWidth = Dimensions.get('window').width;
  const tamanoFuente = windowWidth / 14;
  
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

      console.log('data: ', data);
      return data;
    } catch (error) {
      console.log('Hubo un error en el register', error);
    }
  };

  const crearEvento = async () => {
    const data = await createEventPost();
    if (data && data.length > 0) {
      alert(Success);
      navigation.navigate('Home');
    }
  };

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text>¿Estas seguro?</Text>
          </View>
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