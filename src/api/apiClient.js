import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

/*
Attach JWT automatically to every request
*/

apiClient.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

  },
  (error) => Promise.reject(error)
);


/*
Auto logout when token expires
*/
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response && error.response.status === 401) {

      localStorage.removeItem("token");

      // redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
