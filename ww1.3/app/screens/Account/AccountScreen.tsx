import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have @expo/vector-icons installed
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons, Fontisto } from '@expo/vector-icons'; 
import { useAuth, } from '../../context/AuthContext';
import { useNavigation } from "@react-navigation/native";


const AccountScreen = () => {
     const { user, signOut } = useAuth();
     const navigation = useNavigation();

     const navigateToFavorites = () => {
          // @ts-ignore
          navigation.navigate("Favorites");
     }

     return (
          <View style={styles.container}>
          <View style={styles.header}>
               <Text style={styles.name}>Mihaly Dani</Text>
               <Text style={styles.rating}><Ionicons name="star" size={14} /> 4.83</Text>
          </View>

          <View style={styles.optionsContainer}>
               <TouchableOpacity style={styles.optionButton}>
               <Text>Help</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.optionButton}>
               <Text>Wallet</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.optionButton}>
               <Text>Activity</Text>
               </TouchableOpacity>
          </View>

          <ScrollView style={{ marginTop: 30 }}>
               <TouchableOpacity style={styles.optionListButton}>
                    <MaterialIcons name="account-circle" size={24} color="black" />  
                    <Text style={styles.optionListButtonText}>Settings</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.optionListButton} onPress={navigateToFavorites}>
                  <Fontisto name="favorite" size={24} color="black" />
                  <Text style={styles.optionListButtonText}>Favorites</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.optionListButton}>
                  <FontAwesome name="sign-out" size={24} color="black" />
                  <Text style={styles.optionListButtonText} onPress={signOut}>Logout</Text>
               </TouchableOpacity>
          </ScrollView>


          </View>
     )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  rating: {
    fontSize: 14,
    color: 'gold',
    marginTop: 5,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
  optionListButton: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionListButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,

  },
});

export default AccountScreen;
