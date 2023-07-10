import { useRoute } from "@react-navigation/native";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { auth } from "../context/Provider";
import { getDatabase, ref, set, onValue, off } from "firebase/database";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY =  "Api"; // Replace with your Google Maps API key

async function askLocationPermission() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setErrorMsg("Permission to access location was denied");
    return;
  }

  let { status: status2 } = await Location.requestBackgroundPermissionsAsync();

  let location = await Location.getCurrentPositionAsync({});
  return location;
}

const RoutesMap = () => {
  const route = useRoute();
  const { userchatId } = route.params;

  const [status, setStatus] = useState(null);
  const [otherUsers, setOtherUsers] = useState({});
  
  const [initialRegion, setInitialRegion] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      const result = await askLocationPermission();
      setStatus(result);

      if (result) {
        const { coords } = result;
        set(
          ref(
            getDatabase(),
            `location/${userchatId}/` + auth.currentUser.email.replace(/[@.]/g, "")
          ),
          {
            lat: coords.latitude,
            lng: coords.longitude,
          }
        );
        setInitialRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        });
      }
    };

    const fetchOtherUsers = () => {
      const dbRef = ref(getDatabase(), `location/${userchatId}`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setOtherUsers(data);
        }
      });
    };

    const intervalId = setInterval(fetchOtherUsers, 5000); // Fetch opponent user's location every 5 seconds

    fetchData();
    fetchOtherUsers();
    return () => {
      clearInterval(intervalId);
      off(ref(getDatabase(), `location/${userchatId}`));
    };
  }, [userchatId]);

  const renderMarkers = () => {
    const markers = Object.entries(otherUsers).map(([userEmail, userLocation]) => (
      <Marker
        key={userEmail}
        pinColor="yellow"
        coordinate={{
          latitude: userLocation.lat,
          longitude: userLocation.lng,
        }}
        title={userEmail}
      />
    ));

    if (status && status.coords) {
      markers.push(
        <Marker
          key={"userLocation"}
          
          coordinate={{
            latitude: status.coords.latitude,
            longitude: status.coords.longitude,
          }}
          title={auth.currentUser.email.replace(/[@.]/g, "")}
        />
      );
    }

    return markers;
  };

  const renderDirections = () => {
    if (status && status.coords && Object.keys(otherUsers).length > 0) {
      const origin = {
        latitude: status.coords.latitude,
        longitude: status.coords.longitude,
      };

      const destinations = Object.values(otherUsers).map((userLocation) => ({
        latitude: userLocation.lat,
        longitude: userLocation.lng,
      }));

      return destinations.map((destination, index) => (
        <MapViewDirections
          key={index}
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#4287f5"
        />
      ));
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {status && (
        <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={initialRegion}>
          {renderMarkers()}
          {renderDirections()}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default RoutesMap;
