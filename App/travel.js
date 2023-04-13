import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image,Linking } from "react-native";
import i1 from '../assets/i1.bmp'
function cl(){
    
  Linking.openURL('https://www.google.com/search?sxsrf=APwXEddGhkC1h-UmQjVucxjVL6Ih4fyp8w:1681299654520&q=Howrah+Bridge&stick=H4sIAAAAAAAAAONgFuLQz9U3SC4rt1TiBLFMS4pNK7UUs5Ot9HPykxNLMvPz4AyrxJKSosRkELN4ESuvR355UWKGglNRZkp6KgCZE52mSgAAAA&sa=X&ved=2ahUKEwjsp6yloaT-AhVXRmwGHcIdDMQQ2coHegQIExAB&biw=1536&bih=746&dpr=1.25');
}
const travel = () => {
  const [places, setPlaces] = useState([]);

  const getRecommendedPlaces = async () => {
    try {
      const response = await fetch(
        `https://api.foursquare.com/v2/venues/explore?near=New%20York%20City&client_id=WQJUVZO53ZKUSYT22SGZCP0U3Y3GDGUWJ5UNG0VNO3I5PDK2&client_secret=AONM4BEHOB4JIBZRPRMB2E54A1GD55ZS02H5FY543W5S45L5&v=20230412`
      );
      const responseJson = await response.json();
      const placesData = responseJson.response.groups[0].items.map(
        (item) => item.venue
      );
      setPlaces(placesData);
    } catch (error) {
      console.log("error");
    }
    
  };

  useEffect(() => {
    getRecommendedPlaces();
  }, []);

  return (
    <View>
      <TouchableOpacity
      onPress={cl}
      
    >
      <Image source={i1} style={{width:500,height:500,}} />
    </TouchableOpacity>
    </View>
  );
};

export { travel};
