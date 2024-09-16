import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DBDomain from '../constants/DBDomain.js';

const RegistrarseScreen = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigation = useNavigation();
  const urlApi = `${DBDomain}/api/user/register`;

  const registrarsePost = async () => {
    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: email,
          password: contraseña,
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
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default RegistrarseScreen;