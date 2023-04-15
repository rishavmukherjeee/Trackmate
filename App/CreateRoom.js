import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { ref, push, set } from 'firebase/database';
import { auth, db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
import {name} from '../screens/HomeScreen';
let nme='';
let name2=name;//id
console.log(name); // e.g. "adjvnj3jnj35uojb"
 const CreateRoom = () => {
  
  const [yname, setyname] = useState('');
  const navigation = useNavigation();
  const handleCreateRoom = () => {
   
   

    const newRoomRef = ref(db, `rooms/${name}`);
    set(newRoomRef, {
      
      roomname:yname,
      
    })
    .then(() => {
      console.log('Room created successfully!');
     
      navigation.navigate('Join');
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


export {name2}//id
export {nme}