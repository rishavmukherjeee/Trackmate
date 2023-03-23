import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { auth, db } from '../config/firebase.js';
import { ref, set  } from 'firebase/database';
import * as Location from 'expo-location';
import getRandomName from './getRandomName';
const name = getRandomName();
console.log(name); // e.g. "adjvnj3jnj35uojb"

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
  const [location, setLocation] = useState(null);
  
  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await askLocationPermission();
      setLocation(coords);
      const uid = auth.currentUser.uid;
      const locationRef = ref(
        db,
        `rooms/${name}/${uid}/location`
      );
      set(locationRef, {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      
  askLocationPermission();
    };

    const intervalId = setInterval(getLocation, 5000); // update location every 5 seconds
    return () => clearInterval(intervalId);
  }, [props.rooms]);

  if (!location) {
    return null;
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
            
            coordinate={ location }
            
          />
      </MapView>
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
});

export default Room;
