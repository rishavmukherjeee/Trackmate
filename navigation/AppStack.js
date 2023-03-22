import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateRoom } from '../App/CreateRoom';
import { JoinRoom } from '../App/JoinRoom';
import { HomeScreen } from '../screens';
import Room from '../App/Room';
const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Join' component={JoinRoom} />
      <Stack.Screen name='Create' component={CreateRoom} />
      <Stack.Screen name='Room' component={Room} />
    </Stack.Navigator>
  );
};
