import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Container className="mt-5">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>Company</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <LinkContainer to="/Employees">
                <Nav.Link>Employees</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Departments">
                <Nav.Link>Departments</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/Shifts">
                <Nav.Link>Shifts</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default App;
