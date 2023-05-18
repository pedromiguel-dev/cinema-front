import Table from "react-bootstrap/Table";
import PaginationComlplex from "../../components/forms/Pagination.tsx";
import FormGroup from "../../components/forms/FormSearchAdd.tsx";
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

function Theatres() {
    return <> <FormGroup title={"Salas"} add={"salas"} /> <LinedTable /> </>

}

export default Theatres;