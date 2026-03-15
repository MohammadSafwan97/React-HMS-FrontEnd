import apiClient from "../../../api/apiClient"


export const getPrescriptions = async () => {
  try {
    const res = await apiClient.get("/prescriptions");
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch prescriptions";
  }
};

/* ---------------- GET BY ID ---------------- */

export const getPrescriptionById = async (id) => {
  try {
    const res = await apiClient.get(`/prescriptions/${id}`);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to fetch prescription";
  }
};

/* ---------------- CREATE ---------------- */

export const createPrescription = async (prescription) => {
  try {
    const res = await apiClient.post("/prescriptions", prescription);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to create prescription";
  }
};

/* ---------------- UPDATE ---------------- */

export const updatePrescription = async (id, prescription) => {
  try {
    const res = await apiClient.put(`/prescriptions/${id}`, prescription);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to update prescription";
  }
};

/* ---------------- DELETE ---------------- */

export const deletePrescription = async (id) => {
  try {
    const res = await apiClient.delete(`/prescriptions/${id}`);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to delete prescription";
  }
};