import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { setOrigin } from "../../slices/navSlice";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { Charger } from "../../types/types";
import { useAppDispatch } from "../../store";
import { fetchPublicChargers } from "../../slices/publicChargersSlice";
import ChargerBottomSheet from "../../components/ChargerBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

import chargingStationAvailableImage from '../../assets/charging_station_available.png';
import chargingStationUnavailableImage from "../../assets/charging_station_faulted.png";

type Location = {
  latitude: number;
  longitude: number;
};

const HomeScreen = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [selectedCharger, setSelectedCharger] = useState<Charger | null>(null);
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [publicCharger, setPublicCharger] = useState<Charger[]>([]);

  useEffect(() => {
    const fetchChargers = async () => {
      try {
        const actionResult = await dispatch(fetchPublicChargers());

        if (fetchPublicChargers.fulfilled.match(actionResult)) {
          setPublicCharger(actionResult.payload);
        } else {
          Alert.alert("Error fetching public chargers", actionResult.error.message);
        }
      } catch (error) {
        Alert.alert("Error fetching public chargers");
      }
    };

    fetchChargers();
  }, [dispatch]);

  useEffect(() => {
    let locationSubscription: any;

    const startWatchingLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });

      dispatch(
        setOrigin({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        })
      );

      locationSubscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 0,
        },
        (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setLocation({ latitude, longitude });

          dispatch(
            setOrigin({
              latitude,
              longitude,
            })
          );
        }
      );
    };

    startWatchingLocation();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  // useEffect(() => {
  //   if (selectedCharger) {

  //     bottomSheetRef.current?.expand();
  //   }
  // }, [selectedCharger]);

  const handleMarkerPress = (charger: Charger) => {
    // console.log("Marker pressed", charger);
    setSelectedCharger(charger);
    bottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      {location ? (
        <MapView
          style={StyleSheet.absoluteFillObject}
          showsUserLocation={true}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={location}
            title="Your Location"
            description="This is where you are"
          />
          {publicCharger &&
            publicCharger.map((charger) => {
              // Choose the correct image based on the charger's operational status
              const chargerImage = charger.StatusType?.IsOperational
                ? chargingStationAvailableImage
                : chargingStationUnavailableImage;

              return (
                <Marker
                  key={charger.ID}
                  coordinate={{
                    latitude: charger.AddressInfo.Latitude,
                    longitude: charger.AddressInfo.Longitude,
                  }}
                  image={chargerImage} // Use the selected image
                  onPress={() => handleMarkerPress(charger)}
                />
              );
            })}
        </MapView>
      ) : null}
      {selectedCharger && (
        <ChargerBottomSheet
          ref={bottomSheetRef}
          charger={selectedCharger}
          onClose={() => setSelectedCharger(null)}
        />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
