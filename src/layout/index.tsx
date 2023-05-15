import { Outlet } from "react-router-dom";

function Layout() {
  // const [count, setCount] = useState(0)

  return (
    <main className="App">
      <Outlet />
    </main>
  );
}

export default Layout;
