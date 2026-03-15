import apiClient from "../../../api/apiClient"
export const getAppointments =async () => {
  const res=await apiClient.get("/appointments");
  return res.data;
};

export const createAppointment = async(appointment) => {
  const res=await apiClient.post("/appointments", appointment);
  return res.data;
};

export const updateAppointment = async(id, appointment) => {
 const res=await apiClient.put(`/appointments/${id}`, appointment);
 return res.data;
};

export const deleteAppointment=async(id)=>{
  const res= await apiClient.delete(`/appointments/${id}`)
  return res.data
}
