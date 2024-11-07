import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';


function AppBar() {

    const { handleSearchBtn, 
            setSearch, 
            handleCategories, 
            point, 
            showMob, 
            setShowMob} = useContext(MyContext);

    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    function UserLogout() {
        localStorage.clear();
        setShowMob(false)
        navigate('/signUp');
    }


    return (
        <>
            <Navbar bg="dark" variant="dark" expand={'sm'}  style={{ fontSize: "14px" }}>
                <Container fluid>

                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} bg="dark" variant="dark" onClick={() => setShowMob(true)} />


                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-sm`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                        style={{ backgroundColor: "#3C2930", color: "white" }}
                        show={showMob} onHide={()=>setShowMob(false)}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`} className="me-5 ms-3 fs-1 fw-bold">
                                E-shopper
                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <NavDropdown.Divider />

                        <Offcanvas.Body className='off_body' onTouchMove={()=>setShowMob(false)}>

                            <Nav className="justify-content-end flex-grow-1 pe-3">

                                <Nav.Link as={NavLink} to='/' className="menu"  onClick={()=>setShowMob(false)}>Home</Nav.Link>

                                <NavDropdown title="Categories" id="collasible-nav-dropdown" className='menu width-2 mb-4' menuVariant="dark">

                                    <NavDropdown.Item as={Link} to='/Categories/smartphones' className='menu-item' value={"smartphones"} onClick={() => handleCategories("smartphones")} >Smartphones</NavDropdown.Item>

                                    <NavDropdown.Item as={Link} to='/Categories/laptops' value={"laptops"} className='menu-item' onClick={() => handleCategories("laptops")}>Laptops</NavDropdown.Item>

                                    <NavDropdown.Item as={Link} to='/Categories/fragrances' value={"fragrances"} className='menu-item' onClick={() => handleCategories("fragrances")}
                                    >Fragrances</NavDropdown.Item>

                                    <NavDropdown.Item as={Link} to='/Categories/skincare' value={"skincare"} className='menu-item' onClick={() => handleCategories("skincare")}>Skincare</NavDropdown.Item>

                                    <NavDropdown.Item as={Link} to='/Categories/groceries' value={"groceries"} className='menu-item' onClick={() => handleCategories("groceries")}>Groceries</NavDropdown.Item>

                                    <NavDropdown.Item as={Link} to='/Categories/home-decoration' value={"home-decoration"} className='menu-item' onClick={() => handleCategories("home-decoration")}>Home-decoration</NavDropdown.Item>

                                </NavDropdown>

                                {
                                    auth ?
                                        <Nav.Link as={NavLink} to='/cart' className="menu mb-3" onClick={()=>setShowMob(false)}>
                                            Cart
                                            <i className="bi bi-cart-plus-fill"></i>
                                            <div className="card-badge badge bg-success">{point.length}</div>
                                        </Nav.Link> : ""
                                }
                            </Nav>

                            <Form className="navBar_form d-flex mb-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Search Items">
                                <Form.Control
                                    type="search"
                                    placeholder="Search by category,title,brand,color,size..."
                                    className="rounded-0 shadow-none"
                                    aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                    style={{ fontSize: "15px", padding: "2px 15px 2px 15px" }}
                                />
                                <Button variant="success" className="me-5 text-white rounded-0 shadow-none" style={{ fontSize: "15px", padding: "2px 15px 2px 15px" }} onClick={handleSearchBtn}>Search</Button>
                            </Form>


                            {
                                auth ?
                                    <NavDropdown title="My Account" id="collasible-nav-dropdown" className="menu account width-2 mb-4" menuVariant="dark">

                                        <NavDropdown.Item as={NavLink} to='/myAccount/order' className='menu-item' onClick={() => setShowMob(false)}>My Orders</NavDropdown.Item>

                                        <NavDropdown.Item as={NavLink} to='/myAccount/dashboard' className='menu-item' onClick={() => setShowMob(false)}>Dashboard</NavDropdown.Item>

                                        <NavDropdown.Divider />

                                        <NavDropdown.Item as={NavLink} to='/login' className='menu-item' onClick={UserLogout}>Logout</NavDropdown.Item>

                                    </NavDropdown>
                                    :
                                    <Nav>
                                        <Nav.Link as={NavLink} to='/login' className="menu" onClick={() => setShowMob(false)}>Login</Nav.Link>
                                    </Nav>
                            }

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>

                </Container>
            </Navbar>
        </>
    );
}

export default AppBar;