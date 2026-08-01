import API from "./api";

export const getHospitals = async () => {
  const response = await API.get("/hospitals");
  return response.data;
};





export const getHospitalById = async (id) => {
  const response = await API.get(`/hospitals/${id}`);
  return response.data;
};

export const addHospital = async (hospitalData) => {
  const response = await API.post("/hospitals", hospitalData);
  return response.data;
};

export const updateHospital = async (id, hospitalData) => {
  const response = await API.put(`/hospitals/${id}`, hospitalData);
  return response.data;
};

export const deleteHospital = async (id) => {
  const response = await API.delete(`/hospitals/${id}`);
  return response.data;
};