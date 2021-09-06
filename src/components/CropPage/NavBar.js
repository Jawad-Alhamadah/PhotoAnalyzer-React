import {React } from 'react' 
import {Nav,Navbar,Dropdown,Container} from 'react-bootstrap'
import { BrowserRouter,Link,Route } from 'react-router-dom'
import HomePage from "../HomePage/HomePage";
//Button, Alert,Breadcrumb,Card,,Row,Col,
function NavBar (props) {
    
   
    let navButtons=[]
    let loginButtons=[]
     console.log(props)
    navButtons.push(<Nav.Link  className= {props.textColor+"    rounded hover-shadow ripple"} variant = 'secondary' href="home" >Home</Nav.Link>)
    navButtons.push(<Nav.Link className={props.textColor+"    rounded hover-shadow ripple"}  variant = 'secondary' href="history">History</Nav.Link>)
    navButtons.push(<Nav.Link  className={props.textColor+"    rounded hover-shadow ripple"} variant = 'secondary' href="contact">Contact Us</Nav.Link>)
    navButtons.push(<Nav.Link  className={props.textColor+"    rounded hover-shadow ripple"} variant = 'secondary' href="crop">Crop Page</Nav.Link>)

    loginButtons.push(<Nav.Link className={props.textColor+"    rounded hover-shadow ripple"}  variant = 'secondary' href="login">Login</Nav.Link>)
    loginButtons.push(<Nav.Link  className={props.textColor+"    rounded hover-shadow ripple"} variant = 'secondary' href="register">Register</Nav.Link>)
    

        return (
            <Navbar  bg={props.variant} expand="lg" className={"custom-index "+props.backgroundColor}>
            <Container  >
              <Navbar.Brand href="\home">
                <img
                  src="slack.png"
                  width="40"
                  height="40"
                  className="d-inline-block align-top custom-shadow-1  "
                  alt="logo"
                />
              </Navbar.Brand>
        
              <Navbar.Collapse className="justify-content-end ">
                <Nav className="me-auto col-8 text-info h6 ">
                      {navButtons}
                  </Nav>
                  <Nav className="me-auto col-1  ml-10 h6">
                      {loginButtons}
                  </Nav>
                  </Navbar.Collapse>
                  <Navbar.Toggle aria-controls="basic-navbar-nav">
                  <Dropdown>
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                      Dropdown Button
                    </Dropdown.Toggle>

                  
                  </Dropdown> 


                  </Navbar.Toggle>
                  

            </Container>
          </Navbar>
        )
   
}

export default NavBar