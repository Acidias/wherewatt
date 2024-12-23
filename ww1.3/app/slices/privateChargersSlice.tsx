import { createSlice } from "@reduxjs/toolkit";

interface PrivateCharger {
  id: string;
  homeOwnerName: string;
  UsageCost: number;
  Distance: number;
  AddressInfo: {
     Title: string;
     AddressLine1: string;
     AccessComments: string;
};
  chargerSpeed: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

interface PrivateChargersState {
  chargers: PrivateCharger[];
}
// 37.42553934071756, -122.17773419277437
// 37.4367299086869, -122.1444556321886
export type Charger = {
     DataProvider: {
         WebsiteURL: string,
         Comments: string,
         DataProviderStatusType: {
           IsProviderEnabled: Boolean,
           ID: number,
           Title: string,
         },
         IsRestrictedEdit: Boolean,
         IsOpenDataLicensed: Boolean,
         IsApprovedImport: Boolean,
         License: string,
         DateLastImported: Date,
         ID: number,
         Title: string,
       },
       OperatorInfo: {
         WebsiteURL: string,
         Comments: string,
         PhonePrimaryContact: string,
         PhoneSecondaryContact: string,
         IsPrivateIndividual: Boolean,
         AddressInfo: string,
         BookingURL: string,
         ContactEmail: string,
         FaultReportEmail: string,
         IsRestrictedEdit: Boolean,
         ID: number,
         Title: string,
       },
       UsageType: {
         IsPayAtLocation: Boolean,
         IsMembershipRequired: Boolean,
         IsAccessKeyRequired: Boolean,
         ID: number,
         Title: string,
       },
       StatusType: {
         IsOperational: Boolean,
         IsUserSelectable: Boolean,
         ID: number,
         Title: string,
       },
       SubmissionStatus: {
         IsLive: Boolean,
         ID: number,
         Title: string,
       },
       UserComments: string,
       PercentageSimilarity: number,
       MediaItems: [string],
       IsRecentlyVerified: Boolean,
       DateLastVerified: Date,
       ID: number,
       UUID: string,
       ParentChargePointID: number,
       DataProviderID: number,
       DataProvidersReference: string,
       OperatorID: number,
       OperatorsReference: string,
       UsageTypeID: number,
       UsageCost: string,
       AddressInfo: {
         ID: number,
         Title: string,
         AddressLine1: string,
         AddressLine2: string,
         Town: string,
         StateOrProvince: string,
         Postcode: string,
         CountryID: number,
         Country: {
           ISOCode: string,
           ContinentCode: string,
           ID: number,
           Title: string,
         },
         Latitude: number,
         Longitude: number,
         ContactTelephone1: string,
         ContactTelephone2: string,
         ContactEmail: string,
         AccessComments: string,
         RelatedURL: string,
         Distance: number,
         DistanceUnit: number,
       },
       Connections: [
         {
           ID: number,
           ConnectionTypeID: number,
           ConnectionType: {
             FormalName: string,
             IsDiscontinued: Boolean,
             IsObsolete: Boolean,
             ID: number,
             Title: string,
           },
           Reference: string,
           StatusTypeID: number,
           StatusType: {
             IsOperational: Boolean,
             IsUserSelectable: Boolean,
             ID: number,
             Title: string,
           },
           LevelID: number,
           Level: {
             Comments: string,
             IsFastChargeCapable: Boolean,
             ID: number,
             Title: string,
           },
           Amps: number,
           Voltage: number,
           PowerKW: number,
           CurrentTypeID: number,
           CurrentType: {
             Description: string,
             ID: number,
             Title: string,
           },
           Quantity: number,
           Comments: string,
         },
       ],
       numberOfPoints: number,
       GeneralComments: string,
       DatePlanned: Date,
       DateLastConfirmed: Date,
       StatusTypeID: number,
       DateLastStatusUpdate: Date,
       MetadataValues: [string],
       DataQualityLevel: number,
       DateCreated: Date,
       SubmissionStatusTypeID: number,
  }



const initialState: PrivateChargersState = {
  chargers: [
    {
      id: "charger1",
      homeOwnerName: "Tom Green",
      UsageCost: 0.35,
      Distance: 1.1,
      AddressInfo: {
            Title: "Tom's charger",
            AddressLine1: "361 Tennyson Ave",
            AccessComments: "Available 24/7",
     },
      chargerSpeed: "7kW",
      location: {
        latitude: 37.4367299086869,
        longitude: -122.1444556321886,
      },
    },
    {
      id: "charger2",
      homeOwnerName: "Bob Smith",
      UsageCost: 15.0,
      AddressInfo: {
          Title: "Bob's charger",
          AddressLine1: "5678 Bob's Street",
          AccessComments: "Available 24/7",
     },
      Distance: 2.1,
      chargerSpeed: "22kW",
      location: {
        latitude: 34.0522,
        longitude: -118.2437,
      },
    },
  ],
};

const privateChargersSlice = createSlice({
  name: "privateChargers",
  initialState,
  reducers: {
    addPrivateCharger: (state, action) => {
      state.chargers.push(action.payload);
    },
    removePrivateCharger: (state, action) => {
      state.chargers = state.chargers.filter(charger => charger.id !== action.payload);
    },
    updatePrivateCharger: (state, action) => {
      const index = state.chargers.findIndex(charger => charger.id === action.payload.id);
      if (index !== -1) {
        state.chargers[index] = action.payload;
      }
    },
  },
});

export const { addPrivateCharger, removePrivateCharger, updatePrivateCharger } = privateChargersSlice.actions;

export default privateChargersSlice.reducer;
