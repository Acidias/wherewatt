
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { HomeTab } from './FavoriteTabs/HomeTab';
import { WorkTab } from './FavoriteTabs/WorkTab';
import { FavoriteTab } from './FavoriteTabs/FavoritesTab';

const FavoritesScreen = () => {
     const [selectedTab, setSelectedTab] = useState('Home');
     return (
         <View style={styles.container}>
               <View style={styles.tabsContainer}>
                <TouchableOpacity 
                    style={[styles.tab, selectedTab === 'Home' && styles.selectedTab]}
                    onPress={() => setSelectedTab('Home')}>
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, selectedTab === 'Work' && styles.selectedTab]}
                    onPress={() => setSelectedTab('Work')}>
                    <Text>Work</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.tab, selectedTab === 'Favorites' && styles.selectedTab]}
                    onPress={() => setSelectedTab('Favorites')}>
                    <Text>Favorites</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                {selectedTab === 'Home' && <HomeTab />}
                {selectedTab === 'Work' && <WorkTab />}
                {selectedTab === 'Favorites' && <FavoriteTab />}
            </View>
               
         </View>
     );
 };

const styles = StyleSheet.create({
     container: {
          top: 40,
         flex: 1,
         padding: 20,
         backgroundColor: '#f8f8f8'
     },
     tabsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     tab: {
          flex: 1,
          padding: 15,
          alignItems: 'center',
          borderBottomWidth: 2,
          borderBottomColor: 'transparent',
     },
     selectedTab: {
          borderBottomColor: 'tomato',
     },
 });

export default FavoritesScreen;
