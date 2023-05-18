import Pagination from "react-bootstrap/esm/Pagination";

interface paginationProps {
    page?: number;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}
function PaginationComlplex(props: paginationProps) {
    //resolver paginantion
    const numberOfPages = Array.from({ length: props.totalPages }, (_, index) => index + 1);
    const currentPage = props.page ? props.page : 1;
  return (
    <Pagination className="m-0 p-0" size="sm">
      <Pagination.First onClick={() => props.setPage && props.setPage( 1 )} />
      <Pagination.Prev onClick={() => props.setPage && props.setPage( currentPage > 1 ? currentPage - 1 : currentPage )} />
        {numberOfPages.map((page) => {
            return (
                <Pagination.Item key={page} active={page === props.page} onClick={() => props.setPage && props.setPage(page)}
                                 {...(page === currentPage && { active: true })}
                >
                    {page}
                </Pagination.Item>
            );
        })}
      <Pagination.Next onClick={() => props.setPage && props.setPage( currentPage >= props.totalPages ? currentPage : currentPage + 1 )} />
      <Pagination.Last onClick={() => props.setPage && props.setPage( props.totalPages)} />
    </Pagination>
  );
}

export default PaginationComlplex;
