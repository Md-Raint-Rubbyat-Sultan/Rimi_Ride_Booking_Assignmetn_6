import type { IUser } from "../Auth/userType";

export type LatLng = {
  lat: number;
  lng: number;
};

export interface ILoaction {
  from: LatLng;
  to: LatLng;
}

export interface IRideRequest {
  riderId: string;
  driverId: any;
  rideStatus: string;
  costOfRide: number;
  phone: string;
  location: ILoaction;
  _id: string;
  createdAt: string;
  updatedAt: string;
  rideTime: string;
  id: string;
}

export interface IRideDetails {
  _id: string;
  riderId: IUser;
  driverId: IUser | null;
  rideStatus: string;
  costOfRide: number;
  phone: string;
  location: Location;
  createdAt: string;
  updatedAt: string;
  rideTime: string;
  id: string;
}
