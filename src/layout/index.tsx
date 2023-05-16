import { Outlet } from "react-router-dom";
import useLogout from "../hooks/useLogout";

function Layout() {
  // const [count, setCount] = useState(0)
  // const logout = useLogout();
  return (
    <>
      <main className="App">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
