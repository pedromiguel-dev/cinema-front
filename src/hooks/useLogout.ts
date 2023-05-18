import axios from "../api/axios";
import useAuth from "./useAuth";
// import React from "react";

function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
      setAuth?.({ user: undefined });

      try {
        await axios.get("api/v1/logout", {
          withCredentials: true,
        });
        return
      } catch (error) {
        console.error(error);
      }
  };

  return logout;
}

export default useLogout;
