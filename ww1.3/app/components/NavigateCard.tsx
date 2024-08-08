import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "@rneui/base";

const GOOGLE_MAPS_API_KEY = 'AIzaSyB4t9RprGxVRhcI7Z49xKEdDClo-uV7kD8'


const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const setOriginLocation = (item : any) => {
    console.log("Set Origin item", item);
    dispatch(setDestination({
      location: item.location,
      description: item.address
    }))
    // @ts-ignore
    navigation.navigate("RideOptionsCard");
  }

  return (
    <SafeAreaView style={tw`bg-white flex-1 p-[-25px]`}>
      {/* <Text style={tw`text-center p-4 pt-0 text-xl`}>
        Don't worry we will get you there! 
      </Text> */}
      {/* <View style={tw`border-t border-gray-200 flex-shrink`}> */}
      <View style={[tw`relative h-10 w-90 mb-8 mx-auto `]}>
          <GooglePlacesAutocomplete
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
                borderBottomWidth: 1,
              },
              listView: {
                position: "absolute",
                top: 40,
                width: "100%",
                backgroundColor: '#FFFFFF',  // White background for the suggestions list

                borderColor: '#E0E0E0',      // Border for the suggestions list
                borderRadius: 5,
                borderWidth: 1,
                flex: 1,
                marginVertical: 5,           // Margin around the suggestions list
                elevation: 5,
                shadowColor: "black",
                shadowOpacity: 0.2,
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                shadowRadius: 15
              },
              row: {
                height: 40,                  // Height of each suggestion item
                borderBottomWidth: 0.5,      // Add a separator between items
                borderBottomColor: '#E0E0E0', // Color of separator
                paddingBottom: 10,                 // Padding inside each item
              },
              description: {
                fontSize: 14,                // Font size for suggestion text
                color: '#000',               // Color of the suggestion text
              },
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description
                })
              );

              // @ts-ignore
              navigation.navigate("RideOptionsCard");
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            minLength={2}
            placeholder="Where To?"
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en"
            }}
          />
        </View>
        <View style={[tw`p-4 mt-[-30px],`, {zIndex: -1}]}>
        <NavFavourites onItemClick={setOriginLocation}/>
        </View>
      {/* </View> */}

    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0
  }
});
