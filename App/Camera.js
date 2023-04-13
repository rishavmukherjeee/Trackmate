
    /*const uploadPhoto = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.split('/').pop();
      const storageRef = ref(storage, `rooms/photos/${filename}`);
      await storageRef.put(blob);
      const url = await getDownloadURL(storageRef);
      push(ref(db, 'rooms/photos'), url);
      console.log("uploaded")
    };*/
     /* location remains in same 20 meter radius for 1 minute from getprecisiondistance function from geolib
    take camera permission
    open expo camera screen
    take picture 
    upload it on firebase storage
    get link of firebase storage in realtime data base and add it to chatscreen rooms/{dd}/messages*/
    import React, { useState, useEffect } from 'react';
    import { Text, View } from 'react-native';
    import { Camera, requestCameraPermissionsAsync } from 'expo-camera';
    import { db, storage } from '../config/firebase';
    import { push, set } from 'firebase/database';
    import { ref } from 'firebase/storage';
        
    function Cam(){
      const [hasPermission, setHasPermission] = useState(null);
      const [type, setType] = useState(Camera.Constants.Type.back);
      const [cameraRef, setCameraRef] = useState(null);
    
      useEffect(() => {
        // Request camera permissions
        (async () => {
          const { status } = await requestCameraPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
    
        // Set interval to take picture every 1 minute
        const intervalId = setInterval(() => {
          takePicture();
          
        }, 10000);
    
        // Clear interval on component unmount
        return () => clearInterval(intervalId);
      }, []);
    
      const takePicture = async () => {
        if (cameraRef) {
          const photo = await cameraRef.takePictureAsync();
          console.log(photo);
          const uploadPhoto = async (uri) => {
            const response = await fetch(uri);
            const blob = await response.blob();
            const filename = uri.split('/').pop();
            const storageRef = ref(storage, `rooms/photos/${filename}`);
            await storageRef.put(blob);
            const url = await getDownloadURL(storageRef);
            set(ref(db, 'rooms/photos'), url);
            console.log("uploaded")
          };
          uploadPhoto(photo);
        }
      };
    
      if (hasPermission === null) {
        return <View />;
      }
    
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }
    
      return (
          <Camera  type={type} ref={ref => setCameraRef(ref)}></Camera>
       
      );
    }
    export {Cam}