import React, { useContext } from 'react';
import './NavBar.css';
import { Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import AppBar from './AppBar';


const NavBar = () => {

  const {handleSearchBtn,setSearch,handleCategories,point,searchParams} = useContext(MyContext);
    
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');

  function UserLogout() {
    localStorage.clear();
    navigate('/signUp');
  }




    return (

        <>
            <Navbar expand={'sm'} bg="dark" variant="dark" className="pt-0 pb-0 w-100" style={{fontSize: "14px",zIndex:"20"}}>

                <Navbar.Brand className="me-5 ms-3 fs-6 fw-bold" >E-shopper</Navbar.Brand>

            
                <Nav className="me-auto nav_bar">

                    <Nav.Link as={NavLink} to='/'  className="menu">Home</Nav.Link>

                    <NavDropdown title="Categories" id="collasible-nav-dropdown" className='menu width-2' menuVariant="dark">

                        <NavDropdown.Item  as={Link} to='/Categories/smartphones' className='menu-item' value={"smartphones"} onClick={()=>handleCategories("smartphones")} >Smartphones</NavDropdown.Item>

                        <NavDropdown.Item as={Link} to='/Categories/laptops' value={"laptops"} className='menu-item' onClick={()=>handleCategories("laptops")}>Laptops</NavDropdown.Item>

                        <NavDropdown.Item as={Link} to='/Categories/fragrances' value={"fragrances"}  className='menu-item' onClick={()=>handleCategories("fragrances")}
                        >Fragrances</NavDropdown.Item>

                        <NavDropdown.Item as={Link} to='/Categories/skincare' value={"skincare"}  className='menu-item' onClick={()=>handleCategories("skincare")}>Skincare</NavDropdown.Item>

                        <NavDropdown.Item as={Link} to='/Categories/groceries' value={"groceries"}  className='menu-item' onClick={()=>handleCategories("groceries")}>Groceries</NavDropdown.Item>

                        <NavDropdown.Item as={Link} to='/Categories/home-decoration' value={"home-decoration"}  className='menu-item' onClick={()=>handleCategories("home-decoration")}>Home-decoration</NavDropdown.Item>

                    </NavDropdown>

                { 
                    auth ? 
                    <Nav.Link as={NavLink} to='/cart' className="menu">
                        Cart
                        <i className="bi bi-cart-plus-fill"></i>
                        <div className="card-badge badge bg-success">{point.length}</div>
                    </Nav.Link>:""
                }

                </Nav>

                <Nav className='nav_bar'>
                    <Form className="navBar_form d-flex pt-2 pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Search Items">
                        <Form.Control
                            type="search"
                            placeholder="Search by category,title,brand,color,size..."
                            className="rounded-0 shadow-none"
                            aria-label="Search" 
                            value={searchParams.keyword}
                            onChange={(e)=>setSearch(e.target.value)}
                            style={{fontSize:"15px",padding:"2px 15px 2px 15px"}} 
                        />
                
                        <Button variant="success" className="me-5 text-white rounded-0 shadow-none" style={{fontSize:"15px",padding:"2px 15px 2px 15px"}} onClick={handleSearchBtn}>Search</Button>

                    </Form>

                {
                   auth ?     

                    <NavDropdown title="My Account" id="collasible-nav-dropdown" className="menu account" menuVariant="dark">

                        <NavDropdown.Item as={NavLink} to='/myAccount/order' className='menu-item'>My Orders</NavDropdown.Item>

                        <NavDropdown.Item as={NavLink} to='/myAccount/dashboard' className='menu-item'>Dashboard</NavDropdown.Item>

                        <NavDropdown.Divider />
                        
                        <NavDropdown.Item as={NavLink} to='/login' className='menu-item' onClick={UserLogout}>Logout</NavDropdown.Item>

                    </NavDropdown>
                    :
                    <Nav>
                        <Nav.Link as={NavLink} to='/login'  className="menu">Login</Nav.Link>
                    </Nav>
                }    

                </Nav>

                <AppBar />
            </Navbar>
        </>
    )
}

export default NavBar;