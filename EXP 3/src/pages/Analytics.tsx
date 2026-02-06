import {
  Container,
  Navbar,
  Nav,
  Row,
  Col,
  Card,
  ProgressBar
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Analytics() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
        <Container fluid>
          <Navbar.Brand>Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="px-4 py-4">
        <h2>Analytics Overview</h2>

        <Row className="g-4 mt-3">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Monthly Growth</Card.Title>
                <ProgressBar now={70} label="70%" />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>User Engagement</Card.Title>
                <ProgressBar variant="success" now={85} label="85%" />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Analytics;