import Table from "react-bootstrap/Table";
import PaginationComlplex from "../../components/forms/Pagination.tsx";
import FormGroup from "../../components/forms/FormSearchAdd.tsx";
import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.ts";


function formatDate(dateString: string | undefined) {
    if (!dateString) return "";

    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear().toString();
    return `${day}/${month}/${year}`;
}

interface sessionsProps {
    createdAt: string,
    endSession: string,
    id: string,
    is3D: boolean,
    Movie: {
        id: string,
        title: string,
    },
    Theatre: {
        id: string,
        name: string,
    },
    startDate: string,
    startSession: string,
    ticketPrice: number,
    updatedAt: string,
}
interface props {
    data: Partial<sessionsProps>[]
    page?: number;
    maxPages? : number;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
}

function LinedTable(props: props) {
    return (
        <div className="table-sessios">
            <Table hover responsive id="table-session-container">
                <thead>
                <tr>
                    <th>Sala</th>
                    <th>Filme</th>
                    <th>3D</th>
                    <th>Data</th>
                    <th>Inicio</th>
                    <th>Fim</th>
                    <th>Audio</th>
                </tr>
                </thead>
                <tbody>
                {
                    props?.data.map((session) => {
                        return (
                            <tr key={session.id}>
                                <td>{session.Theatre?.name}</td>
                                <td>{session.Movie?.title}</td>
                                <td>{session.is3D ? "Sim" : "Não"}</td>
                                <td>{formatDate(session.startDate)}</td>
                                <td>{formatDate(session.startSession)}</td>
                                <td>{formatDate(session.endSession)}</td>
                                <td>Português</td>
                            </tr>
                        )
                    })

                }
                </tbody>
            </Table>
            <div className="table-session-pagination">
                <PaginationComlplex setPage={props.setPage} totalPages={props.maxPages ? props.maxPages : 1} page={props.page} />
            </div>
        </div>
    );
}

function Sessions() {
    const runOnce = React.useRef(false)
    const axiosPrivate =  useAxiosPrivate()
    const [filter, setFilter] = React.useState("")
    const [page, setPage] = React.useState(1)
    const [maxPages, setMaxPages] = React.useState(1)
    const [sessions, setSessions] = React.useState<Partial<sessionsProps>[]     >()

    //fetch sessions with axios
    React.useEffect(() => {
        let isMounted = true;
        const controller = new AbortController()
        const sessions = async () => {
            try {
                const response = await axiosPrivate
                    .get("/api/v1/sessions", {signal: controller.signal, params: {filter: filter, page: page}})

                isMounted && setSessions(response.data.sessions)
                isMounted && setMaxPages(response.data.maxPages)

                console.log(page, response.data)
            } catch (e) {
                console.log(e)
            }
        }
        if (runOnce.current === true) {
            sessions();
        }
        return () => {
            runOnce.current = true;
            isMounted = false;
            controller.abort();
        };
    }, [filter, page])

    return(
        <section id="home_container">
            <FormGroup title={"Seção"} add={"seções"}  setFilter={setFilter}  />
            {sessions && <LinedTable data={sessions} setPage={setPage} page={page} maxPages={maxPages} />}
        </section>
    )
}

export default Sessions;