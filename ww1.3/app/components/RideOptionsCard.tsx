import React, { useState, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { selectTravelTimeInformation, selectOrigin, selectDestination, setJob, setDriverLocation } from "../slices/navSlice";
import tw from "twrnc";
import { useAuth } from '../context/AuthContext';
import createJobApi from '../api/createJob';
import getUpdatedJobApi from '../api/getUpdatedJob';
import getDriverLocationApi from '../api/getDriverLocation';
import { createJobSuccess, createJobFailure, updateJobDetails, selectAllJobs, selectCurrentJob } from '../slices/jobSlice';

import {JobType, UserType} from '../types/types';

interface Data {
  id: string;
  title: string;
  multiple: number;
  image: string;
}

const data: Data[] = [
  {
    id: "Standard",
    title: "Standard Taxi",
    multiple: 1,
    image: "https://links.papareact.com/3pn"
  },
  {
    id: "Corp",
    title: "Corporate Taxi",
    multiple: 1.25,
    image: "https://links.papareact.com/7pf"
  }
];

const SURGE_CHARGE_RATE = 1.5;
const GBP_INR = 1;


const RideOptionsCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<Data | null>(data[0]);
  const travelTimeInfo = useSelector(selectTravelTimeInformation);
  const { user } = useAuth();
  const accessToken = user?.accessToken as string;
  const [driverLocation, setDriverLocationState] = useState<{ latitude: number; longitude: number } | null>(null);


  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [jobid, setJobid] = useState<number | null>(null);

  const currentJob = useSelector(selectCurrentJob);
  const allJobs = useSelector(selectAllJobs);

  // console.log("currentJob:", currentJob);
  // console.log("allJobs:", allJobs);

  const computePrice = (multiple: number) => {
    if (!travelTimeInfo?.duration?.value) return 0;
    
    const pricePerSecond = multiple * GBP_INR * SURGE_CHARGE_RATE;
    const totalSeconds = travelTimeInfo?.duration?.value;
    const price = pricePerSecond * totalSeconds / 100;
    const roundedPrice = Math.ceil(price * 100) / 100;
  
    return roundedPrice;
  }





  const createJob = async () => {
    console.log("createJob");
    const newJob: JobType = {
      price: computePrice(selected?.multiple as number),
      currency: "GBP",
      eta: travelTimeInfo?.duration?.value ?? 0,
      distance: travelTimeInfo?.distance?.value ?? 0,
      originAddress: origin?.description ?? "",
      originLat: origin?.location.lat ?? 0,
      originLng: origin?.location.lng ?? 0,
      destinationAddress: destination?.description ?? "",
      destinationLat: destination?.location.lat ?? 0,
      destinationLng: destination?.location.lng ?? 0,
      driver: null,
      customer: user,
    }
    try{
      const response = await createJobApi({ jobData: newJob, accessToken: user!.accessToken });
      console.log("createJob response:", response);
      setJobid(response.jobid);
      dispatch(createJobSuccess(response));
      // @ts-ignore
      navigation.navigate("NavRiderCard");
    } catch (error) {
      console.error("", error);
      dispatch(createJobFailure(error));
    }
  };




  return (
    <SafeAreaView style={tw`pt-[-55px] bg-white flex-grow`}>
      <View style={tw`border-gray-200 border-b`}>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-3 left-5 p-2 rounded-full z-50`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-lg`}>
          Select a Ride - {travelTimeInfo?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const itemPrice = computePrice(item.multiple);
          //console.log("Item Price:", itemPrice);

          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row items-center justify-between px-10 ${
                item.id === selected?.id ? "bg-gray-200" : ""
              }`}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100, resizeMode: "contain" }}
              />
              <View style={tw`-ml-6`}>
                <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
                <Text style={tw``}>{travelTimeInfo?.duration?.text}</Text>
              </View>
              <Text style={tw`text-xl`}>
                {new Intl.NumberFormat("en-gb", {
                  style: "currency",
                  currency: "GBP"
                }).format(itemPrice)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />


      <View style={tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 rounded-lg ${
            !selected ? "bg-gray-300" : ""
          }`}
          onPress={createJob}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
