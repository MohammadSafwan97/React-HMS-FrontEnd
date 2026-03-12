import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/prescriptions";

/* ---------------- GET ALL ---------------- */

export const getPrescriptions = async () => {

  const res = await axios.get(API_BASE_URL);

  return res.data;

};

/* ---------------- GET BY ID ---------------- */

export const getPrescriptionById = async (id) => {

  const res = await axios.get(`${API_BASE_URL}/${id}`);

  return res.data;

};

/* ---------------- CREATE ---------------- */

export const createPrescription = async (prescription) => {

  const res = await axios.post(API_BASE_URL, prescription);

  return res.data;

};

/* ---------------- UPDATE ---------------- */

export const updatePrescription = async (id, prescription) => {

  const res = await axios.put(`${API_BASE_URL}/${id}`, prescription);

  return res.data;

};

/* ---------------- DELETE ---------------- */

export const deletePrescription = async (id) => {

  const res = await axios.delete(`${API_BASE_URL}/${id}`);

  return res.data;

};