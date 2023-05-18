// import React from "react";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./FormSearchAdd.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

interface props {
    title: string;
    add?: string;
    setFilter?:  React.Dispatch<React.SetStateAction<any>>;
    data?: any;

}

const FormGroup = ({title, add, setFilter}: props) => {
    const onType = (e: any) => {
        setFilter && setFilter(e.target.value)

    }
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h1 className="m-0">{title}</h1>
        <button type="submit" className="button_add gap-1">
          <FontAwesomeIcon icon={faPlus} />
          <p className="m-0 ">Adiconar {add}</p>
        </button>
      </div>
      <Form className="d-flex justify-content-between align-items-center mb-3">
        <Form.Group className="mb-0 d-flex" controlId="formBasicEmail">
          <Form.Control type="search" placeholder={`Pesquise ${add}`} onChange={(e) => onType(e)} />
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
