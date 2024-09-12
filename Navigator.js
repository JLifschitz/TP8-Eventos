import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/Home';
import LoginScreen from './components/Login';
import RegistrarseScreen from './components/Registrarse';
import FormularioScreen from './components/Formulario';
const Stack = createNativeStackNavigator();

const navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Registrarse" component={RegistrarseScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Formulario" component={FormularioScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default navigation;