import axios from "axios";

export const axiosInstance = axios.create({
     baseURL: import.meta.env.VITE_API_BASE_URL ||"http://localhost:8080/api/v1"
});


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const newTokenResponse = await axios.post("/auth/refresh-token", { refreshToken });
        localStorage.setItem("accessToken", newTokenResponse.data.accessToken);
        error.config.headers.Authorization = `Bearer ${newTokenResponse.data.accessToken}`;
        return axiosInstance(error.config); 
      }
    }
    return Promise.reject(error);
  }
);
