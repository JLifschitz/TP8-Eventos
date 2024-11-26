import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {UserProvider, useUserContext} from './context/userContext.js';
import HomeScreen from './pantallas/Home';
import LoginScreen from './pantallas/Login';
import RegistrarseScreen from './pantallas/Registrarse';
import FormularioScreen from './pantallas/Formulario';
import DetallesEventoScreen from './pantallas/DetallesEvento';
import PanelAdminScreen from './pantallas/PanelAdmin.js';
import DetalleEventoAdminScreen from './pantallas/DetalleEventoAdmin.js';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <UserProvider>
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
          <Stack.Screen name="DetallesEvento" component={DetallesEventoScreen}/>
          <Stack.Screen name="PanelAdmin" component={PanelAdminScreen}/>
          <Stack.Screen name="DetallesEventosAdmin" component={DetalleEventoAdminScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default Navigation;