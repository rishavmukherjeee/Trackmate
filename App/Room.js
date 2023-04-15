import React, { useState, useEffect } from 'react';
import { StyleSheet, View ,Text, TouchableOpacity, Image,Share,ToastAndroid,Alert,Platform} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { auth, db } from '../config/firebase.js';
import { ref, set ,onValue, push } from 'firebase/database';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { dd } from './JoinRoom.js';
import { name2 } from './CreateRoom.js';
import { nme2 } from './JoinRoom.js';
import { Cam } from './Camera.js';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';
import * as FileSystem from 'expo-file-system';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Anime } from './Anime.js';
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
  useEffect(() => {
    const roomRe = ref(db, `rooms/${dd}/sos`);
    const help = ref(db, `rooms/${dd}/sosuid`);
    onValue(roomRe, (snapshot) => {
      const sosValue = snapshot.val(); // get the value of sos from the snapshot object
      if (sosValue === 1) { // extract the value of the sosuid property from the snapshot object
        onValue(help,(snapshot)=>{
          const uval =snapshot.val();
          
        alert(`Help required with UID: ${uval}`);
        })
        set(ref(db, `rooms/${dd}/sos`), 0);
      }
    });
  }, [dd]);
  
  
  // Add this function to handle the map click event and set the clicked coordinates
  useEffect(() => {
    const roomRef = ref(db, `rooms/${dd}/location`); // use the room ID from props
    onValue(roomRef, (snapshot) => {
      setClickedCoordinates(snapshot.val());
    });
  }, [dd]);

  const handleMapClick = (event) => {
    const { coordinate } = event.nativeEvent;
    if (coordinate) {
      setClickedCoordinates(coordinate);
      set(ref(db, `rooms/${dd}/location`), coordinate);
    }
  };
  const del=()=>{
    setClickedCoordinates(null);
    set(ref(db, `rooms/${dd}/location`),null);
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
  
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(dd);
  };
  async function shareRoomId() {
    try {
      const documentDirectory = FileSystem.documentDirectory;
      const fileName = 'room.txt';
      const content = 'Join my room with ID ' + dd;
      const filePath = documentDirectory + fileName;
      await FileSystem.writeAsStringAsync(filePath, content, { encoding: FileSystem.EncodingType.UTF8 });
      await Sharing.shareAsync(filePath);
    } catch (error) {
      console.log('Error sharing message: ', error);
    }
  }
  const shareMessage = async (message) => {
    try {
      const shareOptions = {
        message: `Join My Room Now: ${message} \n\nDownload TrackMate app Today: https://github.com/rishavmukherjeee/Location`,
      };
      
  
      const result = await Share.share(shareOptions);
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          if (Platform.OS === 'android' && Platform.Version < 26) {
            Alert.alert('Sharing');
          } else {
            ToastAndroid.show('Friends Invited!', ToastAndroid.SHORT);
          }
        }
      } else if (result.action === Share.dismissedAction) {
        ToastAndroid.show('Sharing cancelled', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const jail=()=>{
    copyToClipboard();
    shareMessage(dd)
  }
  return (
    <View style={styles.container}>
       <TouchableOpacity  onPress={jail}>
      <Text style={styles.smallText}>Room id:   {name }  
     <Text style={styles.smallText}>    </Text>
       <Icon name="share-alt" color="black" size={12}></Icon>
       </Text>
       </TouchableOpacity>
      
        
      
     
      <MapView style={styles.map} initialRegion={initialRegion} onPress={handleMapClick}>
      {clickedCoordinates && (
  <Marker
    key="clickedMarker"
    coordinate={clickedCoordinates}
    title="Clicked Location"
    pinColor="#003566"
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
<TouchableOpacity style={styles.button} onPress={del}>
<Text style={styles.smallText2}>Reset waypoint</Text>
    </TouchableOpacity>

    
    
<TouchableOpacity  >
    <Anime />
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
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 3,
    borderBottomColor: '#003566',
    borderBottomWidth:2,
  },
  smallText2: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color:"white",
    margin: 1,
  },
  
 button: {
  position: 'absolute',
  marginLeft:10,
  marginTop:10,
  padding:10,
  backgroundColor: 'blue',
  borderRadius: 50,
  width:65,
  height:55,
  justifyContent: 'center',
  alignItems: 'center',
  elevation : 5
},
button2:{
  top:600,
  right:10,
  position: 'absolute',
  marginLeft:10,
  padding:10,
  backgroundColor: '#606C38',
  borderRadius: 50,
  width:67,
  height:60,
  justifyContent: 'center',
  alignItems: 'center',
  elevation : 5,
}
});

export default Room;
