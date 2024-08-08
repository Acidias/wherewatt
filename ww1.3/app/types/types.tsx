export type UserType = {
     id: number | null;
     firstName?: string;
     lastName?: string;
     email: string;
     createdAt?: string;
     details?: {
          [key: string]: string;
        };
     accessToken: string;
     location?: {
          lat: number;
          lng: number;
     };
     rating?: number | null;
 };


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
//  export type DriverType = {
//      firstName: string | null;
//      lastName: string | null;
//      email: string | null;
//      location: {
//           lat: number;
//           lng: number;
//      },
//      details: {
//           [key: string]: string;
//      };
//      rating: number | null;
//  }

 export type JobType = {
     price: number;
     currency: string;
     eta: number;
     distance: number;
     originAddress: string;
     originLat: number;
     originLng: number;
     destinationAddress: string;
     destinationLat: number;
     destinationLng: number;
     ////
     createdAt?: string;
     updatedAt?: string;
     jobid?: number | null;
     status?: string;
     driver?: UserType | null;
     customer?: UserType | null;
     pickupETA?: number | null;
     destinationETA?: number | null;
 }

 export type LocationType = {
     lat: number;
     lng: number;
 };