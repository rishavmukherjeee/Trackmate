import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
function Anime() {
  const [animationValue, setAnimationValue] = useState(new Animated.Value(0));
  const [showButtons, setShowButtons] = useState(false);
  const navigation = useNavigation();
  const handleChatPress = () => {
    navigation.navigate('Chat');
  }
  const handlePress = () => {
    setShowButtons(true);
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideButtons = () => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowButtons(false);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7}>
        <AntDesign name="upcircleo" size={24} color="black" />
      </TouchableOpacity>
      {showButtons && (
        <Animated.View
          style={[
            styles.buttonsContainer,
            {
              transform: [
                {
                  scale: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
                {
                  translateY: animationValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity style={styles.additionalButton} onPress={() => console.log('Button 1 pressed')} activeOpacity={0.7}>
            {/*Add your additional button icon or text here*/}
            <AntDesign name="staro" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.additionalButton} onPress={() => console.log('Button 2 pressed')} activeOpacity={0.7}>
            {/*Add your additional button icon or text here*/}
            <AntDesign name="hearto" size={24} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity
      style={styles.additionalButton} 
      onPress={handleChatPress}
    >
      <Ionicons name="md-chatbubble-ellipses-outline" size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.additionalButton} onPress={hideButtons} activeOpacity={0.7}>
            {/*Add your additional button icon or text here*/}
            <AntDesign name="downcircleo" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    
  },
  button: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  additionalButton: {
    backgroundColor: 'blue',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export { Anime };
