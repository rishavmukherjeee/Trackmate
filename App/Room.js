import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import {auth, db } from '../config/firebase.js';
import {  ref, onValue, push ,set} from 'firebase/database';
import * as Location from 'expo-location';

async function askLocationPermission() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    // handle permission not granted
  }
  const location = await Location.getCurrentPositionAsync({});
  return location.coords;
}

function Room(props) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
      const locationRef = ref(db, `rooms/${props.rooms}/location/${props.useremail}`);
      set(locationRef, {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };
    askLocationPermission();
    const intervalId = setInterval(getLocation, 5000); // update location every 5 seconds
    return () => clearInterval(intervalId);
  }, [props.useremail, props.rooms]);

  if (!location) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}>
        <Circle center={{
          latitude: location.latitude,
          longitude: location.longitude,
        }} radius={50} fillColor="rgba(255, 0, 0, 0.5)" strokeColor="rgba(255, 0, 0, 0.2)" />
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
