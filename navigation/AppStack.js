import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateRoom } from '../App/CreateRoom';
import { JoinRoom } from '../App/JoinRoom';
import { HomeScreen } from '../screens';
import {ChatScreen} from '../App/ChatScreen';
import Room from '../App/Room';
import { Button } from 'react-native';
import { db } from '../config/firebase';
import { dd } from '../App/JoinRoom';
import {   ref, set } from "firebase/database";

const Stack = createStackNavigator();
function handleSOSClick() {
  set(ref(db, `rooms/${dd}/sos`), 1)
  alert('SOS alert send')
}
export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Join' component={JoinRoom} />
      <Stack.Screen name='Create' component={CreateRoom} />
      <Stack.Screen name='Room' component={Room} options={{
          headerRight: () => (
            <Button
              onPress={handleSOSClick }
              title="SOS"
              color="#ff0000"
            />
          ),
        }}/>
        <Stack.Screen name='Chat' component={ChatScreen} />
    </Stack.Navigator>
  );
};
