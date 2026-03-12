import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/prescription-items";

/* ---------------- CREATE ---------------- */

export const createPrescriptionItem = async (item) => {
  try {
    const res = await axios.post(API_BASE_URL, item);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to create prescription item";
  }
};

/* ---------------- DELETE ---------------- */

export const deletePrescriptionItem = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/${id}`);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to delete prescription item";
  }
};