import Layout from "./layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login/login";
import RequireAuth from "./pages/RequireAuth";
import Register from "./pages/register";
import Users from "./pages/users";
import PersistLogin from "./pages/login/persistLogin";
import NavSidebar from "./components/navsidebar";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        {/**public */}
        <Route path="" element={<Login />} />
        {/** protected */}
        <Route element={<PersistLogin />}>
          <Route element={<NavSidebar />}>
            <Route element={<RequireAuth allowedRoles={[30]} />}>
              <Route path="Register" element={<Register />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[100, 200, 30]} />}>
              <Route path="Home" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[100, 30, 200]} />}>
              <Route path="Users" element={<Users />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
