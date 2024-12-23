import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home/HomeScreen';
import BookingScreen from '../screens/Home/BookingScreen';
import MapScreen from '../screens/Home/MapScreen';

export type HomeStackParamList = {
    HomeMain: undefined;
    BookingScreen: { charger: any };
    Map: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="HomeMain">
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="BookingScreen" component={BookingScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default HomeNavigator;