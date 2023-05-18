import { Outlet } from "react-router-dom";
import React from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

function PersistLogin() {
  // const runEffectOnMount = React.useRef(false);
  const [isLoading, setIsloading] = React.useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  React.useEffect( () => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsloading(false);
      }
    };
    console.log(!auth?.user?.accessToken);
    if (!auth?.user?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsloading(false);
    }
  }, []);

  return <>{isLoading ? <div>loading...</div> : <Outlet />}</>;
}

export default PersistLogin;
