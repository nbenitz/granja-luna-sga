import apiClient from "./api";

export enum BreedProductionTypeEnum {
  LAYER = "Layer",
  BROILER = "Broiler",
  DUAL_PURPOSE = "Dual_Purpose"
}

export interface Breed {
  id: number;
  name: string;
  production_type: BreedProductionTypeEnum;
  avg_adult_weight_kg: number | null;
  space_required_m2_per_bird: number | null;
  productive_lifespan_weeks: number | null;
  sexual_maturity_age_weeks: number | null;
  description: string | null;
  species_id: number;
}

export interface BreedData {
  name: string;
  production_type: BreedProductionTypeEnum;
  avg_adult_weight_kg: number | null;
  space_required_m2_per_bird: number | null;
  productive_lifespan_weeks: number | null;
  sexual_maturity_age_weeks: number | null;
  description: string | null;
  species_id: number;
}

export const getAllBreeds = async (): Promise<Breed[]> => {
  const response = await apiClient.get("/api/breeds/");
  return response.data;
};

export const createBreed = async (breedData: BreedData): Promise<Breed> => {
  const response = await apiClient.post("/api/breeds/", breedData);
  return response.data;
};

export const updateBreed = async (
  id: number,
  breedData: BreedData
): Promise<Breed> => {
  const response = await apiClient.put(`/api/breeds/${id}`, breedData);
  return response.data;
};

export const deleteBreed = async (id: number): Promise<void> => {
  await apiClient.delete(`/api/breeds/${id}`);
};
