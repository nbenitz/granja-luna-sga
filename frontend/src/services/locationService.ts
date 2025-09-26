import apiClient from './api';

export enum LocationTypeEnum {
    CLIMATE_CONTROLLED_SHED = "Climate_Controlled_Shed",
    OPEN_SHED = "Open_Shed",
    PEN = "Pen",
    CAGE_BATTERY = "Cage_Battery",
}

export enum LocationPurposeEnum {
    BROODING = "Brooding",
    REARING = "Rearing",
    LAYING = "Laying",
    FATTENING = "Fattening",
    BREEDING = "Breeding",
    QUARANTINE = "Quarantine",
    INFIRMARY = "Infirmary",
}

export enum LocationStatusEnum {
    AVAILABLE = "Available",
    OCCUPIED = "Occupied",
    CLEANING = "Cleaning",
    MAINTENANCE = "Maintenance",
}

export interface Location {
  id: number;
  name: string;
  location_type: LocationTypeEnum;
  purpose: LocationPurposeEnum;
  usable_area_sqm: number;
  current_status: LocationStatusEnum;
  construction_date: string | null;
  notes: string | null;
}

export interface LocationData {
  name: string;
  location_type: LocationTypeEnum;
  purpose: LocationPurposeEnum;
  usable_area_sqm: number;
  current_status: LocationStatusEnum;
  construction_date: string | null;
  notes: string | null;
}

export const getAllLocations = async (): Promise<Location[]> => {
  const response = await apiClient.get('/api/locations/');
  return response.data;
};

export const createLocation = async (locationData: LocationData): Promise<Location> => {
  const response = await apiClient.post('/api/locations/', locationData);
  return response.data;
};

export const updateLocation = async (id: number, locationData: LocationData): Promise<Location> => {
  const response = await apiClient.put(`/api/locations/${id}`, locationData);
  return response.data;
};

export const deleteLocation = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/locations/${id}`);
};