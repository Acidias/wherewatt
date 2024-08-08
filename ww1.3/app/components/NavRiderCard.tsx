import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "@rneui/base";
import { useAuth } from "../context/AuthContext";
import { createJobSuccess, createJobFailure, updateJobDetails, selectAllJobs, selectCurrentJob } from '../slices/jobSlice';

const GOOGLE_MAPS_API_KEY = 'AIzaSyB4t9RprGxVRhcI7Z49xKEdDClo-uV7kD8'

import getUpdatedJob from "../api/getUpdatedJob";

import { setJob, selectJob } from "../slices/navSlice";
import { JobType } from "../types/types";
const NavRiderCard = () => {
  const dispatch = useDispatch();
  const job = useSelector(selectCurrentJob);
  const navigation = useNavigation();
  const [spinner, setSpinner] = useState(true);
  const user = useAuth();


  useEffect(() => {
    const intervalId = setInterval(() => {
        fetchUpdatedJob();
    }, 5000); // Every minute

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
}, [job?.jobid, user.user?.accessToken]);


  const fetchUpdatedJob = async () => {
    try {
        if(job?.jobid && user.user?.accessToken) {
          const updatedJob = await getUpdatedJob(job.jobid, user.user?.accessToken);
          //console.log('Updated job:', updatedJob);
          // Use this data as needed, for example:
          dispatch(updateJobDetails(updatedJob));
        }
    } catch (error) {
        console.error('Failed to fetch updated job:', error);
    }
};


  const arrivesIn = (pickupETA: number) => {
    const now = new Date().getTime();
    const convertEta = new Date(pickupETA);
    const timeDiff = convertEta.getTime() - now;
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    if(job?.status === "arrival") {
      console.log("(NavRider, Redux) ----- Job:", job.driver)
      setSpinner(false);
    }
  }, [job]);

  return (
    spinner ? (
      <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center p-4 pt-0 text-xl`}>
          We are looking for a driver...
      </Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>

        </View>
      </View>

      <View
        style={tw`flex-row bg-white justify-evenly py-3 mt-auto border-t border-gray-100`}
      >
      </View>
    </SafeAreaView>  
    ) : job?.status === "arrival" && job?.pickupETA ? (
      <SafeAreaView style={tw`bg-white flex-1`}>
        <Text style={tw`text-center p-4 pt-0 text-xl`}>
            The driver {job!.driver?.details.FIRST_NAME} is on the way!
        </Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
            <Text> The drivers pickup ETA: {arrivesIn(job.pickupETA)}</Text>
            </View>
            <View>
            {/* {job?.driver?.location ? (
              <Text>
                  The driver's location: Latitude {job.driver.location.lat}, Longitude {job.driver.location.lng}
              </Text>
            ) : null} */}
            </View>
        </View>
        <View
          style={tw`flex-row bg-white justify-evenly py-3 mt-auto border-t border-gray-100`}
        >
        </View>

      </SafeAreaView>  
    ) : (
      null
    )
  );
};

export default NavRiderCard;

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
