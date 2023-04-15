import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Linking, Image} from "react-native";
import * as Location from 'expo-location';
import { TouchableOpacity } from "react-native-gesture-handler";
async function askLocationPermission() {
  
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    setErrorMsg('Permission to access location was denied');
    return;
  }
  
  let location = await Location.getCurrentPositionAsync({});
  return location;
}
const Travel = () => {
  const [places, setPlaces] = useState([]);

  const getNearbyPlaces = async () => {
    try {
      const { coords } = await askLocationPermission();
      const url = `https://nominatim.openstreetmap.org/search.php?q=tourist+attraction&lat=${coords.latitude}&lon=${coords.longitude}&format=json`;
      const response = await fetch(url);
      const responseJson = await response.json();
      setPlaces(responseJson);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNearbyPlaces();

    const subscription = Location.watchPositionAsync({}, (location) => {
      // Update the places list when the user's location changes
      getNearbyPlaces();
    });

    return () => {
      subscription.remove();
    };
  }, []);
  const handlePress = (item) => {
    const { lat, lon } = item;
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
    Linking.openURL(url);
  }

  const renderPlace = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <View style={styles.placeContainer}>
          <Image source={{ uri: item.image }} style={styles.placeImage} />
          <View style={styles.placeDetailsContainer}>
            <Text style={[styles.placeName, { flex: 1 }]}>{item.display_name}</Text>
            <Text style={styles.placeAddress}>{item.address}</Text>
            <Text style={styles.placeDistance}>{item.distance} km away</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={styles.container}>
      {places.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={places}
            renderItem={renderPlace}
            keyExtractor={(item, index) => index.toString()}
          />
          
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  },
  flatListContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  placeContainer: {
    width: '90%',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    overflow: 'hidden',
    
  },
  placeDetailsContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
  },
  placeName: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#333',
  },
});

export { Travel };
