import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type Job = {
  jobId: number;
  status: number;
  customerid: number;
  customerName: string;
  assigneddriver: number;
  driverName: string;
  originAdress: string;
  originlLat: number;
  originLong: number;
  destinationAdress: string;
  destinationLat: number;
  destinationLong: number;
  price: string;
  pickuptimerequested: string;
  destinationETA: string;
  destinationDistance: string;
  pickupETA: string;
};
export interface NavState {
  origin: {
    location: { lat: number; lng: number } ;
    description: string;
  } | null;
  destination: {
    location: { lat: number; lng: number };
    description: string;
  } | null;
  travelTimeInformation: {
    distance: {
      text: string;
      value: number;
    };
    duration: {
      text: string;
      value: number;
    };
    status: string;
  } | null;
  currentLocation: {
    location: { lat: number; lng: number };
  },
  driverLocation:{
    location: { lat: number; lng: number };
  }
  Job: Job;
}

const initialState: NavState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  currentLocation: {
    location: { lat: 0, lng: 0 },
  },
  driverLocation:{
    location: { lat: 0, lng: 0 },
  },
  Job: {
    jobId: 0,
    status: 0,
    customerid: 0,
    customerName: "",
    assigneddriver: 0,
    driverName: "",
    originAdress: "",
    originlLat: 0,
    originLong: 0,
    destinationAdress: "",
    destinationLat: 0,
    destinationLong: 0,
    price: "",
    pickuptimerequested: "",
    destinationETA: "",
    destinationDistance: "",
    pickupETA: "",
  },
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setJob: (state, action) => {
      state.Job = action.payload;
    },
    setDriverLocation : (state, action) => {
      console.log("Updating driver location with payload:", action.payload);
      state.driverLocation = action.payload
    }
  }
});

export const { setOrigin, setDestination, setTravelTimeInformation, setCurrentLocation, setJob, setDriverLocation } =
  navSlice.actions;


export const selectDriverLocation = (state: RootState) => state.nav.driverLocation;
export const selectJob = (state: RootState) => state.nav.Job;
export const selectCurrentLocation = (state: RootState) => state.nav.currentLocation;
export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.nav.travelTimeInformation;

export default navSlice.reducer;
