import React, { useState, useEffect } from 'react';
import { StyleSheet, View ,Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { auth, db } from '../config/firebase.js';
import { ref, set ,onValue } from 'firebase/database';
import * as Location from 'expo-location';
import { dd } from './JoinRoom.js';
import { name2 } from './CreateRoom.js';
import { nme2 } from './JoinRoom.js';
import { useNavigation } from '@react-navigation/native';
import ChatIcon from '../assets/chat.png';


async function askLocationPermission() {
  
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
  
  let location = await Location.getCurrentPositionAsync({});
  return location;
}

function Room(props) {
  let ame='';
  if(dd==''){
    ame =name2;}
  else{
    ame=dd;
  }
  let name=ame;
  //console.log(dd+" joinroom id");
  //console.log(name2+" createroom id");
  //console.log(name+" roomid to be joined");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentUserUid, setCurrentUserUid] = useState(null);
 
  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await askLocationPermission();
      setLocation(coords);
      
 //console.log(dd);
      const uid = auth.currentUser.uid;
      const locationRef = ref(
        db,
        `rooms/${name}/${uid}/location`
      );
      set(locationRef, {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      
    };
    
    const intervalId = setInterval(getLocation, 5000); // update location every 5 seconds
    return () => clearInterval(intervalId);
  }, [props.rooms]);

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Use the name state variable as the dependency of this effect
    // so that the effect is re-run whenever the name changes
    const roomRef = ref(db, `rooms/${name}`);
    onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      
      if (roomData) {
        const users = Object.keys(roomData);
        const userLocations = users.map((uid) => ({
          uid: uid,
          location: roomData[uid].location,
        }));
        setLocations(userLocations);
      }
    });
  }, [name]);
  const otherUserLocations = locations.filter(
    (userLocation) => userLocation.uid !== currentUserUid
  );
  const currentUserLocation = locations.find(
    (userLocation) => userLocation.uid === currentUserUid
  )?.location;
  
  // Return null if the locations array is empty
  // This prevents the map from rendering before the locations are fetched
  if (!locations || locations.length === 0) {
    return null;
  }

  // Use the first location as the initial region for the map
  const initialRegion = {
    latitude: 22.5726,
    longitude: 88.3639,
    latitudeDelta: 0.7,
    longitudeDelta: 0.7,
  };
 
    
  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>Room id:   {name}</Text>
      <MapView style={styles.map} initialRegion={initialRegion}>
  {otherUserLocations.map((userLocation) => (
    userLocation.location && (
      <Marker
        key={userLocation.uid}
        coordinate={userLocation.location}
        title={userLocation.uid}
        
      />
    )
  ))}
  {currentUserLocation && (
    <Marker
      key={currentUserUid}
      coordinate={currentUserLocation}
      title="You are here"
      pinColor='#1c4424'
    />
  )}
</MapView>
<TouchableOpacity style={styles.chatButton} onPress={useNavigation().navigate('Chat')}>
        <Image source={ChatIcon} style={styles.chatIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  smallText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 1,
  },
  chatButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    borderRadius: 24,
    padding: 12,
    margin: 16,
    elevation: 5,
  },
});

export default Room;
