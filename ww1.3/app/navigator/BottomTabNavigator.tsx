import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import your screens
import HomeNavigator from './HomeNavigator';
import RidesNavigator from './RidesNavigator';
import AccountNavigator from './AccountNavigator';

import HomeIcon from '../assets/home-filled-svgrepo-com';
import HistoryListIcon from '../assets/history-list-svgrepo-com';
import UserIcon from '../assets/profile-user-svgrepo-com';


const Tab = createBottomTabNavigator();

function BottomTabNavigator(){
     return (
               <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeNavigator}                 options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <HomeIcon color={'black'} size={size} />
                    )
                }}/>
                    <Tab.Screen name="Rides" component={RidesNavigator}  options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <HistoryListIcon color={'black'} size={size} />
                    )
                }}/>
                    <Tab.Screen name="Account" component={AccountNavigator} options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                      <UserIcon color={'black'} size={size} />
                    )
                }}/>
               </Tab.Navigator>
     );
}

export default BottomTabNavigator;