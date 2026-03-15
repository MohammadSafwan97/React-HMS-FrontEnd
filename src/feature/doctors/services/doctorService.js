import apiClient from "../../../api/apiClient";


export const createDoctor = async (doctor) => {

  try {

    const res = await apiClient.post("/doctors", doctor);
    return res.data;

  } catch (error) {

    throw error?.response?.data?.message || "Failed to create doctor";

  }

};

export const getAllDoctors = async () => {

  try {

    const res = await apiClient.get("/doctors");
    return res.data;

  } catch (error) {

    throw error?.response?.data?.message || "Failed to fetch doctors";

  }

};

export const updateDoctor = async (id, doctor) => {

  try {

    const res = await apiClient.put(`/doctors/${id}`, doctor);
    return res.data;

  } catch (error) {

    throw error?.response?.data?.message || "Failed to update doctor";

  }

};

export const deleteDoctor = async (id) => {

  try {

    const res = await apiClient.delete(`"/doctors"/${id}`);
    return res.data;

  } catch (error) {

    throw error?.response?.data?.message || "Failed to delete doctor";

  }

};