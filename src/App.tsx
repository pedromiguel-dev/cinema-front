import Layout from "./layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login/Login";
import RequireAuth from "./pages/login/RequireAuth";
import WellCome from "./pages/WellCome";
import Register from "./pages/register";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        {/**public */}
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="" element={<WellCome />} />
        {/** protected */}
        <Route element={<RequireAuth allowedRoles={[30, 200]} />}>
          <Route path="Home" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
