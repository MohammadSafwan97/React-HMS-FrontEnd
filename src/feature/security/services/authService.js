import apiClient from "../../../api/apiClient";

import axios from "axios";

const AUTH_API = "http://localhost:8080/api/auth";

export const login = async (username, password) => {

  const response = await axios.post(`${AUTH_API}/login`, {
    username,
    password
  });

  const { jwt } = response.data;

  localStorage.setItem("token", jwt);

  return response.data;

};

export const signup = async (payload) => {

  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/auth/signup`,
    payload
  );

  return res.data;
};