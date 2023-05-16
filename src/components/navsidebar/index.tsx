import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./index.css";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, NavDropdown, Offcanvas, Button, Row, Col } from "react-bootstrap";
import useLogout from "../../hooks/useLogout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faDoorOpen,
  faFilm,
  faGears,
  faSquareCaretRight,
  faUser,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

const SideBarButtons = () => {
  return (
    <Container fluid id="menu-container">
      <Row className={"gap-4 sidebar-linha active"}>
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
      <Navbar id="main-navbar" expand="md">
        <Container>
          <Navbar.Brand href="/home">
            <h5 className="m-0">
              <b>Cinema</b>
            </h5>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Item className="mx-1">
                <Button variant="light">
                  <FontAwesomeIcon icon={faGears} />
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-1">
                <Button variant="light">
                  <FontAwesomeIcon icon={faUser} />
                </Button>
              </Nav.Item>
              <Nav.Item className="mx-1">
                <Button variant="light" onClick={() => logout()}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main id="main-content">
        <aside id="main-sidebar">
          <SideBarButtons />
          <Row className={"gap-1 m-0 px-2 d-grid"} id="open-sidebar">
            <Button size="sm" onClick={handleToggle} variant="outline-success">
              <FontAwesomeIcon icon={faSquareCaretRight} size="1x" />
            </Button>
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
