import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DBDomain from '../constants/DBDomain.js';
import {useUserContext} from './context/UserContext';

function FormularioScreen ({navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [id_event_category, setIdEventCategory] = useState('');
  const [id_event_location, setIdEventLocation] = useState('');
  const [start_date, setStartDate] = useState('');
  const [duration_in_minutes, setDurationInMinutes] = useState('');
  const [price, setPrice] = useState('');
  const [max_assistance, setMaxAssistance] = useState('');
  const [tags, setTags] = useState('');

  const {usuario} = useUserContext();
  const navigation = useNavigation();
  const urlApi = `${DBDomain}/api/event`;

  const createEventPost = async () => {
    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
          id_event_category: id_event_category,
          id_event_location: id_event_location,
          start_date: start_date,
          duration_in_minutes: duration_in_minutes,
          price: price,
          enable_for_enrollment: true,
          max_assistance: max_assistance,
          id_creator_user: usuario.id,
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

  const registrarse = async () => {
    const data = await registrarsePost();
    if (data && data.length > 0) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registro de Usuario</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Contraseña"
          value={contraseña}
          onChangeText={setContraseña}
          autoCapitalize="none"
          secureTextEntry
          style={styles.input}
        />
      </View>
      <Button title="Registrarse" onPress={registrarse} />
      <Button title="¿Ya tienes cuenta?" onPress={() => navigation.navigate('Login')} />
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
   logo: {
     width: 100, // Ajusta el tamaño del logo según sea necesario
     height: 100,
   },
 });
export default FormularioScreen;