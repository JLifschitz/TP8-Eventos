import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Picker } from 'react-native';
import DBDomain from '../constants/DBDomain.js';
import { useUserContext } from '../context/userContext.js';
import ConfirmacionModal from '../components/Confirmacion.js';

function FormularioScreen({ navigation }) {
  const { token, usuario } = useUserContext();
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

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
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);

  let newEvent = {
    name,
    description,
    id_event_category,
    id_event_location,
    start_date,
    duration_in_minutes,
    price,
    max_assistance,
    id_creator_user: usuario.id,
  };

  const fetchCategories = async () => {
    const urlApi = `${DBDomain}/api/event_categories`;
    try {
      const response = await fetch(urlApi, config);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const fetchLocations = async () => {
    const urlApi = `${DBDomain}/api/event_locations`;
    try {
      const response = await fetch(urlApi);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setLocations(data);
    } catch (error) {
      console.log('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchLocations();
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!name) {
      newErrors.name = 'El nombre es obligatorio';
      valid = false;
    }

    if (!description) {
      newErrors.description = 'La descripción es obligatoria';
      valid = false;
    }

    if (!id_event_category) {
      newErrors.id_event_category = 'La categoría es obligatoria';
      valid = false;
    }

    if (!id_event_location) {
      newErrors.id_event_location = 'La ubicación es obligatoria';
      valid = false;
    }

    if (!start_date) {
      newErrors.start_date = 'La fecha es obligatoria';
      valid = false;
    }

    if (!duration_in_minutes || isNaN(duration_in_minutes) || duration_in_minutes <= 0) {
      newErrors.duration_in_minutes = 'La duración es obligatoria y debe ser un número positivo';
      valid = false;
    }

    if (!price || isNaN(price) || price <= 0) {
      newErrors.price = 'El precio es obligatorio y debe ser un número positivo';
      valid = false;
    }

    if (!max_assistance || isNaN(max_assistance) || max_assistance <= 0) {
      newErrors.max_assistance = 'La cantidad máxima de personas es obligatoria y debe ser un número positivo';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const abrirModal = () => {
    if (validateForm()) {
      setVisible(true);
    }
  };

  const OnPressNavigation = () => {
    navigation.navigate('Home', { updateEvents: true });
  };

  return (
    <View style={styles.container}>
      <ConfirmacionModal visible={visible} setVisible={setVisible} newEvent={newEvent} OnPressNavigation={OnPressNavigation}/>
      <Text>Crear nuevo evento</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

        <Picker
          style={styles.picker}
          selectedValue={id_event_category}
          onValueChange={(itemValue) => setIdEventCategory(itemValue)}
        >
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>
        {errors.id_event_category && <Text style={styles.errorText}>{errors.id_event_category}</Text>}

        <Picker
          style={styles.picker}
          selectedValue={id_event_location}
          onValueChange={(itemValue) => setIdEventLocation(itemValue)}
        >
          {locations.map((location) => (
            <Picker.Item key={location.id} label={location.name} value={location.id} />
          ))}
        </Picker>
        {errors.id_event_location && <Text style={styles.errorText}>{errors.id_event_location}</Text>}

        <TextInput
          placeholder="Fecha"
          value={start_date}
          onChangeText={setStartDate}
          style={styles.input}
        />
        {errors.start_date && <Text style={styles.errorText}>{errors.start_date}</Text>}

        <TextInput
          placeholder="Duración"
          value={duration_in_minutes}
          onChangeText={setDurationInMinutes}
          keyboardType="numeric"
          style={styles.input}
        />
        {errors.duration_in_minutes && <Text style={styles.errorText}>{errors.duration_in_minutes}</Text>}

        <TextInput
          placeholder="Precio"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={styles.input}
        />
        {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

        <TextInput
          placeholder="Cantidad máxima de personas"
          value={max_assistance}
          onChangeText={setMaxAssistance}
          keyboardType="numeric"
          style={styles.input}
        />
        {errors.max_assistance && <Text style={styles.errorText}>{errors.max_assistance}</Text>}
      </View>

      <Button title="Confirmar" onPress={abrirModal} />
      <Button title="Cancelar" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

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
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default FormularioScreen;
