import { Container, Navbar, Nav, Row, Col, Card, Button, Modal, Form, Table } from "react-bootstrap";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Users</Nav.Link>
              <Nav.Link>Settings</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">

        {/* DASHBOARD CARDS */}
        <Row className="g-4">
          {["Users", "Orders", "Revenue", "Products"].map((item, index) => (
            <Col xs={12} md={6} lg={3} key={index}>
              <Card>
                <Card.Body>
                  <Card.Title>{item}</Card.Title>
                  <Card.Text className="fs-4 fw-bold text-primary">
                    {Math.floor(Math.random() * 1000)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* DATA TABLE */}
        <h3 className="mt-5">User Table</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rahul</td>
              <td>rahul@mail.com</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Priya</td>
              <td>priya@mail.com</td>
            </tr>
          </tbody>
        </Table>

        {/* LOGIN FORM */}
        <h3 className="mt-5">Login Form</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>

        {/* MODAL BUTTON */}
        <div className="mt-4">
          <Button variant="success" onClick={() => setShow(true)}>
            Open Modal
          </Button>
        </div>

        {/* MODAL */}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setShow(false)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </>
  );
}

export default App;