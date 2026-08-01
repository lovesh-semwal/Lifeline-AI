import API from "./api";
import api from "./api";

export const reportEmergency = async (formData) => {
  const response = await API.post("/emergency", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};



export const getRecentEmergencies = async () => {
  const response = await api.get("/emergency/recent");
  return response.data.emergencies;
};


export const getEmergencies = async () => {
  const response = await API.get("/emergency");
  return response.data;
};

export const getEmergencyById = async (id) => {
  const response = await API.get(`/emergency/${id}`);
  return response.data;
};

export const deleteEmergency = async (id) => {
  const response = await API.delete(`/emergency/${id}`);
  return response.data;
};