import axios from "axios";

const API_BASE_URL="http://localhost:8080/api/doctors"

export const createDoctor=async(doctor)=>{
const res=await axios.post(API_BASE_URL,doctor);
return res.data;
}

export const getAllDoctors=async()=>{
const res=await axios.get(API_BASE_URL);
return res.data;
}

export const updateDoctor=async(id,patient)=>{
    const res=await axios.put(`${API_BASE_URL}/${id}`,patient)
    return res.data;
}
