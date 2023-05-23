import { Container, Row, Col, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import react_svg from '../../../assets/react.svg'
import "./modal.css"

interface propsModal {
  show: boolean
  onHide: () => void
}


function EditSessions(props: propsModal) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4>
              Data de início
            </h4>
            <h4>Data de fim</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={12} xl={6} className='mb-3 d-flex justify-content-center align-items-center' >
                <Image id="modal_image" src={react_svg} fluid rounded />
              </Col>
              <Col md={12} xl={6} >
                <Form.Group className="mb-3" controlId="formBasicTicket">
                  <Form.Label>Valor de ingresso</Form.Label>
                  <Form.Control type="number" placeholder="Valor do ingresso" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic3D">
                  <Form.Label>Tipo de filme</Form.Label>
                  <Form.Select aria-label="Default select example">
                    <option>Selecione o tipo de filme</option>
                    <option value="0">3D</option>
                    <option value="1">Regular</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Audio</Form.Label>

                  <Form.Select aria-label="Default select example">
                    <option>Selecione o áudio</option>
                    <option value="0">Dublado</option>
                    <option value="1">Áudio original (Legendado).</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Selecione a sala</Form.Label>

                  <Form.Select aria-label="Default select example">
                    <option>Salas sem seções abertas</option>
                    <option value="0">Sala</option>
                    <option value="1">Sala</option>
                    <option value="2">Sala</option>
                    <option value="3">Sala</option>
                    <option value="4">Sala</option>
                  </Form.Select>
                </Form.Group>

              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group as={Col} className='lg-4' controlId="formGridEmail">
            <Form.Control type="text" placeholder="Tempo total da seção" value={"Tempo total da seção"} />
          </Form.Group>
          <Form.Group>
            <Button variant="danger" type="submit">
              Enviar edições
            </Button>
            <Button variant="Cancel">
              Excluir
            </Button>
          </Form.Group>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default EditSessions
