import axios from "axios";

const API_BASE="https://spring-boot-hospital-management-system.onrender.com/api/appointments"

export const getAppointments =async () => {
  const res=await axios.get(`${API_BASE}`);
  return res.data;
};

export const createAppointment = async(appointment) => {
  const res=await axios.post(`${API_BASE}`, appointment);
  return res.data;
};

export const updateAppointment = async(id, appointment) => {
 const res=await axios.put(`${API_BASE}/${id}`, appointment);
 return res.data;
};

export const deleteAppointment=async(id)=>{
  const res= await axios.delete(`${API_BASE}/${id}`)
  return res.data
}
