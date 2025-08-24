export type Role = "ADMIN" | "USER" | "DRIVER";

export type IsActive = "ACTIVE" | "INACTIVE" | "BLOCKED";

export type IsOnline = "ONLINE" | "OFFLINE";

export type IVehicle = "CAR" | "BIKE";

export interface IAuthProviders {
  provider: "credentials" | "google";
  providerId: string;
}

export interface IUser {
  _id: string;
  name: string;
  auth: IAuthProviders[];
  role: Role;
  email: string;
  password?: string;
  phone: string;
  address?: string;
  isActive?: IsActive;
  isDeleted?: boolean;
  isVerified?: boolean;
  picture?: string;
  isOnline?: IsOnline;
  Vehicle?: IVehicle | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICerateRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ICradentials {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}
