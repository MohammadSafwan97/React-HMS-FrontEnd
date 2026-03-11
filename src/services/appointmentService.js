import axios from "axios";

const API_BASE = "http://localhost:8080/api";

export const getAppointments =async () => {
  const res=await axios.get(`${API_BASE}/appointments`);
  return res.data;
};

export const createAppointment = async(appointment) => {
  const res=await axios.post(`${API_BASE}/appointments`, appointment);
  return res.data;
};

export const updateAppointment = async(id, appointment) => {
 const res=await axios.put(`${API_BASE}/appointments/${id}`, appointment);
 return res.data;
};