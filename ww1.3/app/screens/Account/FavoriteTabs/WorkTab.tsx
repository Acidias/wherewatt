import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, selectFavorites, removeFavorite } from "../../../slices/favoritesSlice";
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

import { styles } from './styles';
const GOOGLE_MAPS_API_KEY = 'AIzaSyB4t9RprGxVRhcI7Z49xKEdDClo-uV7kD8'


export const WorkTab = () => {
     const [selectedPlace, setSelectedPlace] = useState<any>(null);
     const dispatch = useDispatch();
     const favorites = useSelector(selectFavorites);
     const [selectWork, setWorkFavorite] = useState<any>(null);

     useEffect(() => {
          const workFavorite = favorites.find(fav => fav.icon === "briefcase");
          if (workFavorite) {
               setWorkFavorite(workFavorite);
          }
     })


     const handleAddToFavorite = async () => {
          console.log("Add to Favorite");
          console.log(selectedPlace);
          interface AddressComponent {
               long_name: string;
               short_name: string;
               types: string[];
           }
          if (selectedPlace) {
               const routeComponent = selectedPlace.address_components.find((component: AddressComponent) => component.types.includes('route'));
               const streetName = routeComponent ? routeComponent.long_name : "";

               const existingWorkFavorite = favorites.find(fav => fav.icon === "briefcase");
               if (existingWorkFavorite) {
                   dispatch(removeFavorite(existingWorkFavorite.id));
               }

               const favorite = {
                    name: selectedPlace.name,
                    icon: "briefcase",
                    address: selectedPlace.formatted_address,
                    location: selectedPlace?.geometry.location,

               };
               dispatch(addFavorite(favorite));
               console.log("Favorite added:", favorite);
          } else {
              console.log("No place selected");
          }
      }
     return (
     <>
          <GooglePlacesAutocomplete
               styles={{
                    container: styles.autocompleteContainer,
                    textInput: styles.textInput
               }}
               renderRightButton={() => (
               <TouchableOpacity
                    onPress={handleAddToFavorite}
                    style={styles.circleAddButton}
               >
                    <FontAwesome5 name="plus" size={24} color="white" />
               </TouchableOpacity>
               )}
               fetchDetails={true}
               enablePoweredByContainer={false}
               nearbyPlacesAPI="GooglePlacesSearch"
               debounce={400}
               placeholder="Place to add"
               query={{
                    key: GOOGLE_MAPS_API_KEY,
                    language: "en"
               }}
               onPress={(data, details) => {
                    setSelectedPlace(details);
               }}
               textInputProps={{
               onChangeText: (text) => {
                    if (text === '') {
                         setSelectedPlace(null);
                    }
                    }
               }}
          />
          <View style={styles.favoritesList}>
               {selectWork && (
                    <View style={styles.favoriteItem}>
                         <View style={styles.favoriteIconContainer}>
                           <FontAwesome5 name="briefcase" size={24} color="black" />
                         </View>
                         <View style={styles.favoriteTextContainer}>
                              <Text style={styles.favoriteName}>{selectWork.name}</Text>
                              <Text style={styles.favoriteAddress}>{selectWork.address}</Text>
                         </View>

                         <TouchableOpacity
                              onPress={() => dispatch(removeFavorite(selectWork.id))}
                              style={styles.removeButton}>
                              <AntDesign name="delete" size={24} color="black" />
                         </TouchableOpacity>
                    </View>
               )}
          </View>

     </>
     )
}