import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import RidesScreen from '../screens/Rides/RidesScreen';
import MapScreen from '../screens/Home/MapScreen';

const Stack = createStackNavigator();

const RidesNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="RidesMain">
            <Stack.Screen name="RidesMain" component={RidesScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default RidesNavigator;
