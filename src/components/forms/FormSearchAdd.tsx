import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormSearchAdd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

const FormGroup = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h1 className="m-0">Filmes</h1>
        <button type="submit" className="button_add gap-1">
          <FontAwesomeIcon icon={faPlus} />
          <p className="m-0 ">Adiconar filme</p>
        </button>
      </div>
      <Form className="d-flex justify-content-between align-items-center mb-3">
        <Form.Group className="mb-0 d-flex" controlId="formBasicEmail">
          <Form.Control type="search" placeholder="Pesquise filmes" />
          <div className="spacer"></div>
          <button type="submit" className="button_add justify-content-center">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Form.Group>
      </Form>
    </>
  );
};

export default FormGroup;
