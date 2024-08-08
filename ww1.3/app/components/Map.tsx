import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import tw from "twrnc";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
  selectDriverLocation,
  selectCurrentLocation
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
// import { GOOGLE_MAPS_API_KEY } from "@env";
import axios from "axios";
import { FontAwesome5 } from '@expo/vector-icons';

import { selectAllJobs, selectCurrentJob } from "../slices/jobSlice";
import { current } from "@reduxjs/toolkit";

const GOOGLE_MAPS_API_KEY = 'AIzaSyB4t9RprGxVRhcI7Z49xKEdDClo-uV7kD8'

const Map: React.FC = () => {
  const dispatch = useDispatch();
  const mapRef = useRef<MapView>(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const currentJob = useSelector(selectCurrentJob);
  const currentLocation = useSelector(selectCurrentLocation);
  
  const driverLocation = currentJob?.driver?.location;

  console.log("Driver Location =====>", driverLocation);


  useEffect(() => {
    if (!origin || !destination || driverLocation && currentJob?.status !== "arrival") return;

    setTimeout(() => {
      mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true
      });
    }, 2000);
  }, [origin, destination]);

  useEffect(() => {
    if (driverLocation && currentJob?.status == "arrival"){
      console.log("Updating driver location with payload:", driverLocation);
      setTimeout(() => {
        mapRef?.current?.fitToSuppliedMarkers(["origin", "driver"], {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true
        });
      }, 2000);
    }
  }, [driverLocation]);



  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      const originLatLng = `${origin.location.lat},${origin.location.lng}`;

      if(origin.description === "Current Location") {
        origin.description = originLatLng;
      }

      const URL = `https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.description}&origins=${origin.description}&units=metric&key=${GOOGLE_MAPS_API_KEY}`;

      const config = {
        method: "get",
        url: URL,
        headers: {}
      };

      axios(config)
        .then((response) => {
          dispatch(setTravelTimeInformation(response.data.rows[0].elements[0]));
        })
        .catch(function (error) {
          console.log("Error", error);
        });
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: !origin ? 20.296684204764738 : origin.location.lat,
        longitude: !origin ? 85.82388378070975 : origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      }}
    >

        {origin && currentJob?.status == "arrival" && currentJob?.driver?.location && (
          <MapViewDirections
            origin={origin.description}
            destination={{
              latitude: currentJob.driver.location.lat,
              longitude: currentJob.driver.location.lng
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}

      {origin && destination && currentJob?.status !== "arrival" && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
      {currentJob?.driver?.location && (
        <Marker
          coordinate={{
            latitude: currentJob.driver.location.lat,
            longitude: currentJob.driver.location.lng
          }}
          title="Driver's Location"
          identifier="driver"
        >
          <FontAwesome5 name="taxi" size={24} color="black" />
        </Marker>
      )}

      
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
