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
