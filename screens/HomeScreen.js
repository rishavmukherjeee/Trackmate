import React from 'react';
import { View, StyleSheet, ImageBackground ,Text,TouchableOpacity} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config';
import { useNavigation } from '@react-navigation/native';
import { Logo } from '../components';
import { Images} from '../config';
import getRandomName from '../App/getRandomName';
import Icon from 'react-native-vector-icons/FontAwesome';
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
    navigation.navigate('Travel')
  };
  const handleJoinRoom = () => {
    navigation.navigate('Join');
    console.log('Joining a room...');
  };
  
  return (
    <ImageBackground
      source={require('../assets/back.jpeg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.smoltext}>TrackMate</Text>
      <View style={styles.logoContainer}>
            <Logo uri={Images.map} />
            <View>
              <Text style={styles.screenTitle}>WELCOME!</Text>
            </View>
    
      </View>
      <TouchableOpacity onPress={handleCreateRoom}style={styles.button3}>
        <Text style={styles.buttonText2}><Icon name="plus" color="white" size={12}></Icon> Create Room</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={handleJoinRoom} style={styles.button3}>
        <Text style={styles.buttonText2}><Icon name="users" color="white"/> Join Room</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.buttonred}>
          <Text style={styles.buttonText}><Icon name="sign-out"/>Sign Out</Text>
          </TouchableOpacity>
      <View>
    
     <TouchableOpacity style={styles.button} onPress={clk}>
     <Text style={styles.buttonText}><Icon name="globe"/> Travel recommendations</Text>
     </TouchableOpacity>
   
    </View>
    </View>
    </ImageBackground>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },background: {
    flex: 1,
    resizeMode: 'cover',
  },
  screenTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 30,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  
  buttonContainer: {
    color:'#FFF',
    marginVertical: 10,
    width: '80%'
  },
  button2: {
    backgroundColor: '#F2A007',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button3: {
    backgroundColor: '#0077be',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  button: {
    backgroundColor: '#F2A007',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonred: {
    backgroundColor: '#F0544F',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    width: '40%',
    maxWidth: 300,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center'
  },
  buttonText2: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center'
  },
  smoltext:{
    top:-22,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
export {HomeScreen}
export{name}
