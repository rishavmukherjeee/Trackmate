import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateRoom } from '../App/CreateRoom';
import { JoinRoom } from '../App/JoinRoom';
import { HomeScreen } from '../screens';
import {ChatScreen} from '../App/ChatScreen';
import Room from '../App/Room';
import { Button } from 'react-native';
const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Join' component={JoinRoom} />
      <Stack.Screen name='Create' component={CreateRoom} />
      <Stack.Screen name='Room' component={Room} options={{
          headerRight: () => (
            <Button
              onPress={() => alert('SOS alert send')}
              title="SOS"
              color="#ff0000"
            />
          ),
        }}/>
        <Stack.Screen name='Chat' component={ChatScreen} />
    </Stack.Navigator>
  );
};
