import axios from "axios";
const API_BASE_URL="https://spring-boot-hospital-management-system.onrender.com/api/patients"

export const getAllPatients=async()=>{
const res=await axios.get(API_BASE_URL);
return res.data;
}

export const getPatientById=async(id)=>{
const res=await axios.get(`${API_BASE_URL}/${id}`);
return res.data;
}

export const createPatient =async(patient)=>{
const res=await axios.post(API_BASE_URL,patient);
return res.data;
}

export const updatePatient=async(id,patient)=>{
const res=await axios.put(`${API_BASE_URL}/${id}`,patient);
return res.data;
}

export const deletePatient=async(id)=>{
const res=await axios.delete(`${API_BASE_URL}/${id}`);
return res.data;
}
