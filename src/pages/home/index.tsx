// import React from "react";
import "./home.css";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import React from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import FormGroup from "../../components/forms/FormSearchAdd";
import Table from "react-bootstrap/esm/Table";
import PaginationComlplex from "../../components/forms/Pagination";

function LinedTable() {
  return (
    <div className="table-sessios">
      <Table hover responsive id="table-session-container">
        <thead>
          <tr>
            <th>id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
      <div className="table-session-pagination">
        <PaginationComlplex />
      </div>
    </div>
  );
}
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
      <section id="home_container">
        <FormGroup />
        <LinedTable />
      </section>
    </>
  );
}

export default Home;
