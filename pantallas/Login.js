import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DBDomain from '../constants/DBDomain.js';
import {useUserContext} from '../context/userContext.js';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const {token, setToken, usuario, setUsuario} = useUserContext();
  
  const fetchToken = async () => {
    const urlApi = `${DBDomain}/api/user/login`;
    try {
      const response = await fetch(urlApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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

      return data;
    } catch (error) {
      console.log('Hubo un error en el login ', error);
    }
  };

  const verifyToken = async (token) => {
    const urlApi = `${DBDomain}/api/user/verify/${token}`;
    try {
      const response = await fetch(urlApi);

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
  };

  const generateToken = async () => {
    const data = await fetchToken();
    if (data && data.token) {
      setToken(data.token);
    }
  };

  useEffect( () =>{
    setToken(null);
    setUsuario(null);
  }, []);

  useEffect(() => {
    const verifyUser = async () => {
      if (token !== null) {
        const userData = await verifyToken(token);
        if (userData !== null) {
          setUsuario(userData);
        }
      }
    };

    verifyUser();
  }, [token]);

  useEffect( () =>{
  if (usuario !== null)
  {
    navigation.navigate('Home');
  }
  }, [usuario, navigation]);


  return (
    <View style={styles.container}>
      <Text>Inicio Sesión</Text>
      <View style={styles.inputContainer}>
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
      <Button title="Iniciar Sesión" onPress={generateToken} />
      <Button title="¿No tienes cuenta?" onPress={() => navigation.navigate('Registrarse')} />
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

export default LoginScreen;