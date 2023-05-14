import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Unauthorized from "../unauthorized";

interface props {
  allowedRoles: number[];
}
const RequireAuth = ({ allowedRoles }: props) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth?.user) {
    const role = auth?.user.roles.find((role) => {
      return allowedRoles.includes(role.id);
    });

    return role ? <Outlet /> : <Unauthorized />;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
