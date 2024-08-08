import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { setCurrentLocation } from '../slices/navSlice';
import { Text } from 'react-native';

export const LocationUpdater = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

     useEffect(() => {
          const fetchLocation = async () => {
               let { status } = await Location.requestForegroundPermissionsAsync();
               if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
               }
               let location = await Location.getCurrentPositionAsync({});
               const modLocation = {
                    location: {
                         lat: location.coords.latitude,
                         lng: location.coords.longitude
                    }
               }
               //dispatch(setCurrentLocation(modLocation));
          };

          fetchLocation();

          //SET INTERVAL 2 SECONDS
          const intervalId = setInterval(fetchLocation, 2000);

          return () => clearInterval(intervalId);
     }, [dispatch]);

     return (errorMsg) ? <Text>{errorMsg}</Text> : null;
};