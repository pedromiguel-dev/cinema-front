import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./index.css";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, NavDropdown, Offcanvas, Button, Row, Col } from "react-bootstrap";
import useLogout from "../../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faFilm, faVideo } from "@fortawesome/free-solid-svg-icons";

const SideBarButtons = () => {
  return (
    <Container fluid>
      <Row className={"gap-4 sidebar-linha"}>
        <Col>
          <FontAwesomeIcon icon={faFilm} />
        </Col>
        <h5 className="p-0 m-0">Filmes</h5>
      </Row>
      <Row className={"gap-4 sidebar-linha"}>
        <Col>
          <FontAwesomeIcon icon={faVideo} />
        </Col>
        <h5 className="p-0 m-0">Seções</h5>
      </Row>
      <Row className={"gap-4 sidebar-linha"}>
        <Col>
          <FontAwesomeIcon icon={faDoorOpen} />
        </Col>
        <h5 className="p-0 m-0">Salas</h5>
      </Row>
    </Container>
  );
};

const NavSidebar = () => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow((prev) => !prev);

  const logout = useLogout();
  return (
    <div id="navsidebar">
      <Navbar id="main-navbar" expand="md" variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/home">Área de gerenciamento</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/home">Config</Nav.Link>
              <NavDropdown title="Usuário" id="basic-nav-dropdown" align={"end"}>
                <NavDropdown.Item href="/home">Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => logout()}>Sair</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main id="main-content">
        <aside id="main-sidebar">
          <SideBarButtons />
          <Row className={"gap-1"}>
            <Col>
              <Button onClick={handleToggle}>Side</Button>
            </Col>
          </Row>
        </aside>
        <Offcanvas show={show} onHide={handleToggle}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ padding: 0 }}>
            <SideBarButtons />
          </Offcanvas.Body>
        </Offcanvas>
        <div id="app-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default NavSidebar;
