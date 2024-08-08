import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from '../screens/Account/AccountScreen';
import SettingsScreen from '../screens/Account/SettingsScreen';
import FavoritesScreen from '../screens/Account/FavoritesScreen';

const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="AccountMain">
            <Stack.Screen name="AccountMain" component={AccountScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
};

export default AccountNavigator;
