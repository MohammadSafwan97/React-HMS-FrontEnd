import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/prescription-items";

/* ---------------- CREATE ---------------- */

export const createPrescriptionItem = async (item) => {

  const res = await axios.post(API_BASE_URL, item);

  return res.data;

};

/* ---------------- DELETE ---------------- */

export const deletePrescriptionItem = async (id) => {

  const res = await axios.delete(`${API_BASE_URL}/${id}`);

  return res.data;

};