import React from 'react'
import {Link} from 'react-router-dom'
import {
    
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap'
export const HeadingPerson = () => {
    return (
        <div className="Navs1">
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand href = "/">Family Members</NavbarBrand>
                        <Nav>
                            <NavItem>
                                <Link className="btn btn-primary" to="/add">Add</Link>
                                <Link className="btn btn-warning mr-1" to="/edit">Edit</Link>
                            </NavItem>
                        </Nav>
                </Container>
            </Navbar>
        </div>
        
    )
}
