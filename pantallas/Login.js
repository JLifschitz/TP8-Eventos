import React, { useState, useEffect } from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  const urlApi = `gentle-pika-cunning.ngrok-free.app/api/user/login`;

  const fetchToken = async () => {
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

  const generateToken = async () => {
    const data = await fetchToken();
    if (data && data.length > 0) {
      setToken(data);
    }
  };

  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token]);

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