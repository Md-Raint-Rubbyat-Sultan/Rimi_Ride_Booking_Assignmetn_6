import type { ComponentType } from "react";

export type {
  IUser,
  ICerateRequest,
  ILogin,
  ICradentials,
  IAuthProviders,
  IVehicle,
  IsActive,
  IsOnline,
  Role,
} from "@/types/Auth/userType";

export type {
  ILoaction,
  LatLng,
  IRideRequest,
  IRideDetails,
} from "@/types/BookRide/rideTypes";

export interface IMetaData {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: null | IMetaData;
}

export interface IError {
  success: boolean;
  message: string;
  error: any;
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    Component: ComponentType;
  }[];
}

// export interface NavMain {
//   title: string;
//   items: Item[];
// }

// export interface Item {
//   title: string;
//   url: string;
// }
