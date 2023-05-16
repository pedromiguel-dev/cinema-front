// import React from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React from "react";
import useRefreshToken from "../../hooks/useRefreshToken";

function Home() {
  const [_, setResult] = React.useState<any>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = useRefreshToken();

  const runEffectOnce = React.useRef(false);

  React.useEffect(() => {
    if (runEffectOnce.current === true) {
      let isMounted = true;
      const controller = new AbortController();

      const verifyRoleWhenLoaded = async () => {
        try {
          const resultA = await axiosPrivate.get("/api/v1/home", { signal: controller.signal });
          isMounted && setResult(resultA);
          console.log(resultA);
        } catch (error) {
          console.log(error);
          navigate("/", {
            state: { from: location },
            replace: true,
          });
        }
      };
      verifyRoleWhenLoaded();

      return () => {
        isMounted = false;
        controller.abort();
      };
    }
    return () => {
      runEffectOnce.current = true;
    };
  }, []);

  return (
    <>
      <section>
        <h1>Home page</h1>
        {/* <Link to={"/Users"}>see users</Link> */}
        <button onClick={() => refresh()}>refresh</button>
      </section>
    </>
  );
}

export default Home;
