import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Button, TextInput, Input } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DBDomain from '../constants/DBDomain.js';
import {useUserContext} from '../context/userContext.js';
import ConfirmacionModal from '../components/Confirmacion.js';

function FormularioScreen ({navigation}) {
  const {token, usuario} = useUserContext();
  const config = {
    headers: { Authorization: `Bearer ${token}`}
  }

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [id_event_category, setIdEventCategory] = useState('');
  const [locations, setLocations] = useState([]);
  const [id_event_location, setIdEventLocation] = useState('');
  const [start_date, setStartDate] = useState('');
  const [duration_in_minutes, setDurationInMinutes] = useState('');
  const [price, setPrice] = useState('');
  const [max_assistance, setMaxAssistance] = useState('');

  let newEvent = {
    name: name,
    description: description,
    id_event_category: id_event_category,
    id_event_location: id_event_location,
    start_date: start_date,
    duration_in_minutes: duration_in_minutes,
    price: price,
    max_assistance: max_assistance,
    id_creator_user: usuario.id,
  }

  const fetchCategories = async () => {
    const urlApi = `${DBDomain}/api/event_categories`;
    try {
      const response = await fetch(urlApi, config);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      if (!data) throw new Error('No data returned');

      return data;
    } catch (error) {
      console.log('Hubo un error en el fetchCategories', error);
    }
  };

  const fetchLocations = async () => {
    const urlApi = `${DBDomain}/api/event_locations`;
    try {
      const response = await fetch(urlApi);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      if (!data) throw new Error('No data returned');

      console.log('data: ', data);
      return data;
    } catch (error) {
      console.log('Hubo un error en el fetchLocations', error);
    }
  };

  useEffect(() => {
    const fetchAndSetCategories = async () => {
      const data = await fetchCategories();
      console.log('Categories: ', data );
      if (data.length > 0) {
        setCategories(data);
      }
    };
    const fetchAndSetLocations = async () => {
      const data = await fetchLocations();
      console.log('Locations: ', data );
      if (data.length > 0) {
        setLocations(data);
      }
    };

    fetchAndSetCategories();
    fetchAndSetLocations();
  }, []);

  //abrir y cerrar modal
  const [visible, setVisible] = useState(false);
  const abrirModal = () =>
  {
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <ConfirmacionModal visible={visible} setVisible={setVisible} newEvent={newEvent}/>
      <Text>Crear nuevo evento</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Descripcion"
          value={description}
          onChangeText={setDescription}
          autoCapitalize="none"
          style={styles.input}
        />
        <Picker
          style={styles.picker}
          selectedValue={id_event_category}
          onValueChange={(itemValue) => setIdEventCategory(itemValue)}
        >
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>
        <Picker
          style={styles.picker}
          selectedValue={id_event_location}
          onValueChange={(itemValue) => setIdEventLocation(itemValue)}
        >
          {locations.map((location) => (
            <Picker.Item key={location.id} label={location.name} value={location.id} />
          ))}
        </Picker>
        <TextInput
          placeholder="Fecha"
          value={start_date}
          onChangeText={setStartDate}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Duracion"
          value={duration_in_minutes}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              const parsedText = parseInt(text, 10);
              setDurationInMinutes(parsedText);
            }
          }}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Precio"
          value={price}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              const parsedText = parseInt(text, 10);
              setPrice(parsedText);
            }
          }}
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="Cantidad maxima de personas"
          value={max_assistance}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              const parsedText = parseInt(text, 10);
              setMaxAssistance(parsedText);
            }
          }}
          autoCapitalize="none"
          style={styles.input}
        />     
        <Text>buenas</Text>
      </View>
 
      <Button title="Confirmar" onPress={abrirModal}/>
      <Button title="Cancelar" onPress={() => navigation.navigate('Home')}/>
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
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  }
 });
export default FormularioScreen;