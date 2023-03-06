import axios from "axios";
import { useContext, useEffect } from "react";
import { axiosInstance } from "../axiosInstance";
import { AuthContext } from "../context/authContext";

const AxiosProvider = () => {
  const { loginUser, logoutUser } = useContext(AuthContext);
  useEffect(() => {
    const interceptorId = axiosInstance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalRequest = err.config;
        if (err.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const res = await axios.get("/auth/refresh", {
            withCredentials: true,
          });
          if (response === 200) {
            loginUser(res?.data?.user);
            return axiosInstance(originalRequest);
          } else {
            logoutUser();
            return Promise.reject(err);
          }
        } else {
          return Promise.reject(err);
        }
      }
    );
    return () => {
      axiosInstance.interceptors.response.eject(interceptorId);
    };
  }, []);
  return null;
};

export default AxiosProvider;
