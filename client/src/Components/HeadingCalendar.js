import React from 'react'
import {Link} from 'react-router-dom'
import {
    
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap'

export const HeadingCalendar = () => {
  return (
       <div className="Navs3">
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand href = "/">Calendar</NavbarBrand>
                        <Nav>
                            <NavItem>
                                <Link className="btn btn-primary" to="/addC">Add</Link>
                                <Link className="btn btn-warning mr-1" to="/editC">Attendees</Link>
                                <Link className="btn btn-danger" to="/deleteC">Cancel</Link>
                            </NavItem>
                        </Nav>
                </Container>
            </Navbar>
        </div>
  );
}

export default HeadingCalendar;