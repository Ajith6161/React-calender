import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from "../../Assets/resizedlogo.png";

import './Navbar.css'
const Toolbar = () => {
  return (
    <Navbar collapseOnSelect  variant="dark" className='navbarbg' style={{position:'sticky', top:0}} >
      <Container>
        <Navbar.Brand href="#home"> <img src={logo} alt="logo"  width={"100px"} height={"40px"} /></Navbar.Brand>
       
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            {/* <Nav.Link href="#deets">More deets</Nav.Link> */}
            <Nav.Link eventKey={2} href="#memes">
             Sign in
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Toolbar;
