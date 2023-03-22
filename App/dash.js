import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { ref, set } from 'firebase/database';
import { db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';

const CreateRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [pass, setPass] = useState('');
  const [user, setUser] = useState('');
  const navigation = useNavigation();

  const handleCreateRoom = () => {
    if (roomName.trim() === '') {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }

    const newRoomRef = ref(db, `rooms/${roomName.trim()}`); // Use roomName as key
    set(newRoomRef, {
      password: pass,
      user: user,
    })
      .then(() => {
        console.log('Room created successfully!');
        setRoomName('');
        setPass('');
        setUser('');
        navigation.navigate('Room', { roomName });
      })
      .catch(error => {
        console.log('Error creating room: ', error);
        Alert.alert('Error', 'Failed to create room');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Room Name"
        value={roomName}
        onChangeText={text => setRoomName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={pass}
        onChangeText={text => setPass(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={user}
        onChangeText={text => setUser(text)}
      />
      <Button title="Create Room" onPress={handleCreateRoom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '80%',
    marginBottom: 20,
  },
});

export { CreateRoom };

/*import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { db } from '../config/firebase.js';
import { ref, set } from 'firebase/database';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';

async function askLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    // handle permission not granted
  }
  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
}

function Room() {
  const [location, setLocation] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const route = useRoute();

  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      const roomName = route.params?.roomName || '';
      const userEmailRef = ref(db, `rooms/${roomName}/users/${userEmail}`);
      set(userEmailRef, {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };
    askLocationPermission();import { getDatabase, ref, set } from 'firebase/database';
   const intervalId = setInterval(getLocation, 5000); // update location every 5 seconds

    



import { db } from '../config/firebase';

const database = getDatabase();

const createRoomsNode = () => {
  const roomsRef = ref(database, 'rooms');
  set(roomsRef, {});
};

// Call this function once to create the 'rooms' node in your database
createRoomsNode();

 




const Name = ({ roomName }) => {
  return <Text>{roomName}</Text>;
};

export { CreateRoom, Name };






<View style={styles.container}>
  <TextInput
    style={styles.input}
    placeholder='Room Name'
    value={roomName}
    onChangeText={text => setRoomName(text)}
  />
  <TextInput
    style={styles.input}
    placeholder='Password'
    value={pass}
    onChangeText={text => setPass(text)}
  />
  <Button title='Create Room' onPress={handleCreateRoom} />
  <Name roomName={roomName} />
</View>
*/




