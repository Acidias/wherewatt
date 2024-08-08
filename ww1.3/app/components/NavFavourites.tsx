import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setDestination, setOrigin, selectCurrentLocation } from "../slices/navSlice";
import { selectFavorites } from "../slices/favoritesSlice";

const NavFavourites = ({ onItemClick }: { onItemClick: (item: any) => void }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const iconExistsInIonicons = "home";


  return (
    <>
    <View style={{ zIndex: -1}}>
      <Text style={[tw`text-xl font-semibold leading-7 text-gray-900`]}>Favorites</Text>
    </View>
    <View style={[tw`mt-2 border-t border-gray-200`, { zIndex: -1}]}>
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200 h-1`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { icon, address, name, location } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-2`}
          onPress={() => onItemClick({ address, location })}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-1`}
            name={iconExistsInIonicons ? icon : "default-icon-name"}
            type="ionicon"
            color="white"
          />
          <View>
            <Text style={tw`font-semibold text-base`}>{name}</Text>
            <Text style={tw`text-gray-500`}>{address}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    </View>
    </>
  );
};

export default NavFavourites;
