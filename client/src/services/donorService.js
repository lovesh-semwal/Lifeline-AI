import API from "./api";

export const getDonors = async () => {
  const response = await API.get("/donors");
  return response.data;
};

export const getDonorById = async (id) => {
  const response = await API.get(`/donors/${id}`);
  return response.data;
};

export const addDonor = async (donorData) => {
  const response = await API.post("/donors", donorData);
  return response.data;
};

export const updateDonor = async (id, donorData) => {
  const response = await API.put(`/donors/${id}`, donorData);
  return response.data;
};

export const deleteDonor = async (id) => {
  const response = await API.delete(`/donors/${id}`);
  return response.data;
};