import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home/HomeScreen';
import MapScreen from '../screens/Home/MapScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="HomeMain">
            <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default HomeNavigator;
