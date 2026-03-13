import axios from "axios";

const API_BASE_URL = "https://spring-boot-hospital-management-system.onrender.com/api/prescriptions";

/* ---------------- GET ALL ---------------- */

export const getPrescriptions = async () => {
  try {
    const res = await axios.get(API_BASE_URL);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch prescriptions";
  }
};

/* ---------------- GET BY ID ---------------- */

export const getPrescriptionById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch prescription";
  }
};

/* ---------------- CREATE ---------------- */

export const createPrescription = async (prescription) => {
  try {
    const res = await axios.post(API_BASE_URL, prescription);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to create prescription";
  }
};

/* ---------------- UPDATE ---------------- */

export const updatePrescription = async (id, prescription) => {
  try {
    const res = await axios.put(`${API_BASE_URL}/${id}`, prescription);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to update prescription";
  }
};

/* ---------------- DELETE ---------------- */

export const deletePrescription = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to delete prescription";
  }
};