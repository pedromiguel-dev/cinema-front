import Pagination from "react-bootstrap/esm/Pagination";

function PaginationComlplex() {
  return (
    <Pagination className="m-0 p-0" size="sm">
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item active>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}

export default PaginationComlplex;
