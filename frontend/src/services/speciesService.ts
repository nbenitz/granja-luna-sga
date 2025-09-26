import apiClient from './api';

export const getAllSpecies = async () => {
  const response = await apiClient.get('/api/species/');
  return response.data;
};

export const createSpecies = async (speciesData: any) => {
  const response = await apiClient.post('/api/species/', speciesData);
  return response.data;
};

export const updateSpecies = async (id: number, speciesData: any) => {
  const response = await apiClient.put(`/api/species/${id}`, speciesData);
  return response.data;
};

export const deleteSpecies = async (id: number) => {
  const response = await apiClient.delete(`/api/species/${id}`);
  return response.data;
};
