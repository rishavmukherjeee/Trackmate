import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const travel = () => {
  const [places, setPlaces] = useState([]);

  const getRecommendedPlaces = async () => {
    try {
      const response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?near=New%20York%20City&client_id=${WQJUVZO53ZKUSYT22SGZCP0U3Y3GDGUWJ5UNG0VNO3I5PDK2}&client_secret=${AONM4BEHOB4JIBZRPRMB2E54A1GD55ZS02H5FY543W5S45L5}&v=20230412`
      );
      const responseJson = await response.json();
      const placesData = responseJson.response.groups[0].items.map(
        (item) => item.venue
      );
      setPlaces(placesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecommendedPlaces();
  }, []);

  return (
    <View>
      {places.map((place) => (
        <Text key={place.id}>{place.name}</Text>
      ))}
    </View>
  );
};

export { travel};
