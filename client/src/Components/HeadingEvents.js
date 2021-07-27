import React from 'react'
import {Link} from 'react-router-dom'
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from 'reactstrap'
export const HeadingEvents = () => {
    return (
        <div className="Navs2">
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand href = "/">Appointments</NavbarBrand>
                        <Nav>
                            <NavItem>
                                <Link className="btn btn-primary" to="/addE">Add</Link>
                                <Link className="btn btn-warning mr-1" to="/editE">Edit</Link>
                            </NavItem>
                        </Nav>
                    
                </Container>
            </Navbar>
        </div>
    )
}
