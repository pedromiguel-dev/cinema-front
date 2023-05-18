import Layout from "./layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login/login";
import RequireAuth from "./pages/RequireAuth";
import Register from "./pages/register";
import Users from "./pages/users";
import PersistLogin from "./pages/login/persistLogin";
import NavSidebar from "./components/navsidebar";
import Sessions from "./pages/sessions";
import Theatres from "./pages/theatres";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        {/**public */}
        <Route path="" element={<Login />} />
        {/** protected */}
        <Route element={<PersistLogin />}>
          <Route element={<NavSidebar />}>
            <Route element={<RequireAuth allowedRoles={[100, 200, 30]} />}>
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[100, 200, 30]} />}>
              <Route path="filmes" element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[100, 200, 30]} />}>
              <Route path="secoes" element={<Sessions />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[100, 200, 30]} />}>
              <Route path="salas" element={<Theatres />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[100, 30, 200]} />}>
              <Route path="users" element={<Users />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
