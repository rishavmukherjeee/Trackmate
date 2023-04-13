import React from 'react';
import { View, StyleSheet, Button ,Text,TouchableOpacity} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../components';
import { Images,Colors} from '../config';
import getRandomName from '../App/getRandomName';
let name = getRandomName(9);

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleLogout = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
  };
  
  const handleCreateRoom = () => {
    navigation.navigate('Create')
    console.log('Creating a new room...');
  };
  const clk = () => {
    navigation.navigate('Trav')
  };
  const handleJoinRoom = () => {
    navigation.navigate('Join');
    console.log('Joining a room...');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
            <Logo uri={Images.map} />
            <Text style={styles.screenTitle}>      Rooms!</Text>
          </View>
      <View style={styles.buttonContainer}>
        <Button title='Create Room' onPress={handleCreateRoom} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Join Room' onPress={handleJoinRoom} />

      </View>
      <Button title='Sign Out' onPress={handleLogout} />
      <View>
      <Text>Travel recommendations:</Text>
     <TouchableOpacity style={styles.button} onPress={clk}>

     </TouchableOpacity>
   
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1c4424',
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.white,
    paddingTop: 20,
    alignItems: 'center'
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%'
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export {HomeScreen}
export{name}