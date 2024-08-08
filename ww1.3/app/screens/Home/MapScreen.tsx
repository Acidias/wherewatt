import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../../components/Map";
import NavigateCard from "../../components/NavigateCard";
import RideOptionsCard from "../../components/RideOptionsCard";
import NavRiderCard from "../../components/NavRiderCard";
import tw from "twrnc";
import { Icon } from "@rneui/base/dist/Icon/Icon";
import * as Location from "expo-location";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLocation, setCurrentLocation } from "../../slices/navSlice";

import { putLocation } from "../../api/putLocation";
import { useAuth, } from '../../context/AuthContext';

const MapScreen = () => {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  const navigation = useNavigation();
  const navState = useNavigationState(state => state);
  const currentLocation = useSelector(selectCurrentLocation);
  const { user } = useAuth();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  useEffect(() => {
    let locationSubscription: any;
  
    const startWatchingLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
  
      // This will subscribe you to location updates
      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,  // Update every 1 second
          distanceInterval: 10  // Or every 10 meters
        },
        (newLocation) => {
          // Handle the new location data here
          dispatch(setCurrentLocation({
            location: {
              lat: newLocation.coords.latitude,
              lng: newLocation.coords.longitude
            },
          }));
        }
      );
    };
  
    startWatchingLocation();
  
    return () => {
      if (locationSubscription) {
        locationSubscription.remove(); // Stop watching for location updates when the component unmounts
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("currentLocation", currentLocation);
      putLocation(user!, currentLocation.location);
    }, 10000);

    return () => {
        clearInterval(intervalId);
    };
  }, [currentLocation]);

  return (
    <View>
      <View style={{ height: '50%' }}>
        <Map />
      </View>

      <View style={{ height: '50%'}}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="NavRiderCard"
            component={NavRiderCard}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({});
