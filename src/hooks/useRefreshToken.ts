import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("api/v1/refresh", {
      withCredentials: true,
    });
    console.log({ auth, setAuth });

    setAuth?.({ user: { accessToken: response.data.accessToken, roles: response.data.roles } });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
