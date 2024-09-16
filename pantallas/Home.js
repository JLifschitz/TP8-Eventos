 import  React from 'react';
 import { View, Text, StyleSheet } from 'react-native';
 import Evento from '../components/evento.js'
 
 function HomeScreen ({navigation}) {
     return (
         <View>
             <Text>Bienvenido</Text>
             <View>
                 <Text>Esta es la home</Text>
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
      width: 100, // Ajusta el tamaño del logo según sea necesario
      height: 100,
    },
  });
 export default HomeScreen;