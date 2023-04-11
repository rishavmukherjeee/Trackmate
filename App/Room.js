import React, { useState, useEffect } from 'react';
import { StyleSheet, View ,Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { auth, db } from '../config/firebase.js';
import { ref, set ,onValue } from 'firebase/database';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import ChatIcon from '../assets/chat.png';
import { dd } from './JoinRoom.js';
import { name2 } from './CreateRoom.js';
import { nme2 } from './JoinRoom.js';
import { Cam } from './Camera.js';
import { Ionicons } from '@expo/vector-icons';
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
  const navigation = useNavigation();
  Cam();
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
  const [clickedCoordinates, setClickedCoordinates] = useState(null);

  // Add this function to handle the map click event and set the clicked coordinates
  const handleMapClick = (event) => {
    const { coordinate } = event.nativeEvent;
    setClickedCoordinates(coordinate);
  
  };
  const del=()=>{
    setClickedCoordinates(null);
  }
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
  const handleChatPress = () => {
    navigation.navigate('Chat');
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.smallText}>Room id:   {name}</Text>
      <TouchableOpacity style={styles.button} onPress={del}>
      <Ionicons name="ios-add" size={5} color="white" />
    </TouchableOpacity>
      <MapView style={styles.map} initialRegion={initialRegion} onPress={handleMapClick}>
      {clickedCoordinates && (
  <Marker
    key="clickedMarker"
    coordinate={clickedCoordinates}
    title="Clicked Location"
    pinColor="blue"
  />
)}
  {otherUserLocations.map((userLocation) => (
    userLocation.location && (
      <Marker
        key={userLocation.uid}
        coordinate={userLocation.location}
        title={userLocation.uid}
        
      />
    )
  ))}
  
</MapView>
<TouchableOpacity
      style={styles.chatButton}
      onPress={handleChatPress}
    >
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
    elevation: 5,
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  chatIcon:{
    borderRadius:10,
    marginVertical:599,
    width:50,
    height:50,
    margin:20,
  }
, button: {
  position: 'absolute',
  
  right: 10,
  backgroundColor: 'blue',
  borderRadius: 50,
  width: 15,
  height: 15,
  justifyContent: 'center',
  alignItems: 'center',
  elevation : 5
},
  
});

export default Room;
