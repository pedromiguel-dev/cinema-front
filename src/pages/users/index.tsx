import React, { useRef } from "react";
import { user } from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
const Users = () => {
  const [users, setUsers] = React.useState<user[]>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const runEffectOnce = useRef(false);

  React.useEffect(() => {
    if (runEffectOnce.current === true) {
      let isMounted = true;
      const controller = new AbortController();

      const getUsers = async () => {
        try {
          const response = await axiosPrivate.get("/api/v1/register", { signal: controller.signal });
          isMounted && setUsers(response.data);
        } catch (error) {
          console.log(error);
          navigate("/Login", {
            state: { from: location },
            replace: true,
          });
        }
      };

      getUsers();

      return () => {
        isMounted = false;
        controller.abort();
        runEffectOnce.current = true;
      };
    }
    return () => {
      runEffectOnce.current = true;
    };
  }, []);

  return (
    <article>
      <h2>users list</h2>
      {users?.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users</p>
      )}
    </article>
  );
};

export default Users;
