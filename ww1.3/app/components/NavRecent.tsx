import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { Icon } from "@rneui/base";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setDestination, setOrigin, selectCurrentLocation } from "../slices/navSlice";

const NavRecent = ({ onItemClick }: { onItemClick: (item: any) => void }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = [
    {
      id: "123",
      icon: "home",
      name: "Recent Test",
      destination: "9 Duchy Street, London, UK"
    },

  ];

  return (
    <>
    <View style={{ zIndex: -1}}>
      <Text style={[tw`text-xl font-semibold leading-7 text-gray-900`]}>Recent</Text>
    </View>
    <View style={[tw`mt-2 border-t border-gray-200`, { zIndex: -1}]}>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200 h-1`, { height: 0.5 }]} />
      )}
      renderItem={({ item: { icon, destination, name } }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}
          onPress={() => onItemClick({ name, destination })}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{name}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
    </View>
    </>
  );
};

export default NavRecent;
