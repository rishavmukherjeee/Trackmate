import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { ref, push, set } from 'firebase/database';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import {name} from '../screens/HomeScreen';
let nme='';
let name2=name;
console.log(name); // e.g. "adjvnj3jnj35uojb"
 const CreateRoom = () => {
  
  console.log(name);
  const [roomName, setRoomName] = useState('');
  const [pass, setPass] = useState('');
  const [yname, setyname] = useState('');
  const navigation = useNavigation();
  const handleCreateRoom = () => {
    if (roomName.trim() === '') {
      Alert.alert('Error', 'Please enter a room name');
      return;
    }
    
    const newRoomRef = ref(db, `rooms/${name}`);
    set(newRoomRef, {
      password: pass,
      user:roomName,
      
    })
    .then(() => {
      console.log('Room created successfully!');
      setRoomName('');
      navigation.navigate('Room');
    })
    .catch(error => {
      console.log('Error creating room: ', error);
      Alert.alert('Error', 'Failed to create room');
    });
  };
  nme=yname;
  
  return (
    // Exporting roomName from the CreateRoom component
    
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
        <TextInput
          style={styles.input}
          placeholder='Enter your name'
          value={yname}
          onChangeText={text => setyname(text)}
        />
        <Button title='Create Room' onPress={handleCreateRoom} />
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
    marginBottom: 20
  }
});

export { CreateRoom };


export {name2}
export {nme}