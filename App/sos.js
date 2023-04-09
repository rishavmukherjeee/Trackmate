import { Notifications } from 'expo';
import { dd } from './JoinRoom';
import { onValue, ref, set } from 'firebase/database';
import { db } from '../config/firebase';

function listenForSOS() {
  onValue(ref(db, `rooms/${dd}/sos`), async (snapshot) => {
    console.log('sv');
    const sosValue = snapshot.val();
    if (sosValue === 1) {
      await sendForegroundNotification();
   //   await sendBackgroundNotification();
      
      set(ref(db, `rooms/${dd}/sos`), 0);
    }
  });
}

async function sendBackgroundNotification() {
  const token = await Notifications.getExpoPushTokenAsync();
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  const message = {
    to: token,
    sound: 'default',
    title: 'SOS Alert',
    body: 'Someone needs help!',
    data: { type: 'sos' },
  };
  await Notifications.scheduleNotificationAsync(message);
}

async function sendForegroundNotification() {
  const message = {
    title: 'SOS Alert',
    body: 'Someone needs help!',
    data: { type: 'sos' },
  };
  await Notifications.presentNotificationAsync(message);
}

// Call the listenForSOS function every 5 seconds
setInterval(listenForSOS, 5000);
