import { axiosPrivate } from "../api/axios";
import { useEffect, useRef } from "react";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const prevRequest = useRef(false);
  const { auth } = useAuth();

  useEffect(() => {
    if (prevRequest.current === true) {
      const requestInterceptor = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${auth?.user?.accessToken}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      const responseInterceptor = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          console.log(error);

          const prevRequest = error.config;
          if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest);
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosPrivate.interceptors.response.eject(requestInterceptor);
        axiosPrivate.interceptors.response.eject(responseInterceptor);
        prevRequest.current = true;
      };
    }
    return () => {
      prevRequest.current = true;
    };
  }, [auth, refresh]);
  return axiosPrivate;
};

export default useAxiosPrivate;
