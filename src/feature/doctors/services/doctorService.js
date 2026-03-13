import axios from "axios";

import { API_BASE_URL } from "../../../config/api.js";

export const createDoctor = async (doctor) => {

  try {

    const res = await axios.post(API_BASE_URL, doctor);
    return res.data;

  } catch (error) {

    throw error?.response?.data?.message || "Failed to create doctor";

  }

};

export const getAllDoctors = async () => {

  try {

    const res = await axios.get(API_BASE_URL);
    return res.data;

  } catch (error) {

    throw error?.response?.data?.message || "Failed to fetch doctors";

  }

};

export const updateDoctor = async (id, doctor) => {

  try {

    const res = await axios.put(`${API_BASE_URL}/${id}`, doctor);
    return res.data;

  } catch (error) {

    throw error?.response?.data?.message || "Failed to update doctor";

  }

};

export const deleteDoctor = async (id) => {

  try {

    const res = await axios.delete(`${API_BASE_URL}/${id}`);
    return res.data;

  } catch (error) {

    throw error?.response?.data?.message || "Failed to delete doctor";

  }

};