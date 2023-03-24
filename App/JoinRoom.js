import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import { ref, get } from 'firebase/database';
import { db } from '../config/firebase';
import { useNavigation } from '@react-navigation/native';
let dd='';
let nme2='';
 const JoinRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');
  const navigation = useNavigation();
 const [yname, setyname] = useState('');
  const handleJoinRoom = async () => {
    if (!roomId.trim()) {
      Alert.alert('Error', 'Please enter a room ID');
      return;
    }
nme2=yname;
    const roomRef = ref(db, `rooms/${roomId}`);
    const roomSnapshot = await get(roomRef);
    dd=roomId;
    //console.log(dd);
    if (!roomSnapshot.exists()) {
      Alert.alert('Error', 'Room not found');
      return;
    }

    const roomData = roomSnapshot.val();
/*
    if (password !== roomData[password]) {
      console.log(roomData.password)
      Alert.alert('Error', 'Incorrect password');
      return;
    }*/

    navigation.navigate('Room');
  };

  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder='Room ID'
        value={roomId}
        onChangeText={setRoomId}
      />
      <TextInput
          style={styles.input}
          placeholder='Enter your name'
          value={yname}
          onChangeText={text => setyname(text)}
        />
    

      <Button title='Join Room' onPress={handleJoinRoom} />
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
export {JoinRoom}
export {dd}//roomid

export {nme2}