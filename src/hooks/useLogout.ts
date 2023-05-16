import axios from "../api/axios";
import useAuth from "./useAuth";

function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth?.({ user: undefined });

    try {
      const response = await axios.get("api/v1/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
}

export default useLogout;
