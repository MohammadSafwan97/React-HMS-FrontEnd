import apiClient from "../../../api/apiClient";

/* ---------------- CREATE ---------------- */

export const createPrescriptionItem = async (item) => {
  try {
    const res = await apiClient.post("/prescription-items", item);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to create prescription item";
  }
};

/* ---------------- DELETE ---------------- */

export const deletePrescriptionItem = async (id) => {
  try {
    const res = await apiClient.delete(`"/prescription-items"/${id}`);
    return res.data;
  } catch (error) {
    throw error?.response?.data?.message || "Failed to delete prescription item";
  }
};