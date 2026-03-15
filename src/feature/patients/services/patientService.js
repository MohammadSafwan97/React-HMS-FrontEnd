import apiClient from "../../../api/apiClient";

export const getAllPatients = async () => {
  const res = await apiClient.get("/patients");
  return res.data;
};

export const getPatientById = async (id) => {
  const res = await apiClient.get(`/patients/${id}`);
  return res.data;
};

export const createPatient = async (patient) => {
  const res = await apiClient.post("/patients", patient);
  return res.data;
};

export const updatePatient = async (id, patient) => {
  const res = await apiClient.put(`/patients/${id}`, patient);
  return res.data;
};

export const deletePatient = async (id) => {
  const res = await apiClient.delete(`/patients/${id}`);
  return res.data;
};
