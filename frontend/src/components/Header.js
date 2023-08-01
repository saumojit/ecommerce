import React from 'react'
import { Container,Navbar,Nav, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import {SearchBox} from './SearchBox'
import { logout } from '../actions/userActions'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  
  const logoutHandler=()=>{
    console.log('user logged out')
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to='/' style={{ textDecoration: 'none' }}>
          <Navbar.Brand>ProShop</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox/>
          <Nav className="mr-auto">
            <LinkContainer to='/cart/:id' style={{ textDecoration: 'none' }}>
              <Nav.Link><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
            </LinkContainer>
            {
              (userInfo && !Array.isArray(userInfo)) ? (
                <NavDropdown title={userInfo.name.split(' ')[0].trim()} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/account'>
                    <NavDropdown.Item>Your Account</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/wishlist'>
                    <NavDropdown.Item>Your Wish Lists</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ): 
              (
                <LinkContainer  to='/login' style={{ textDecoration: 'none' }}>
                <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                </LinkContainer>
              )}
                {
                  (userInfo && !Array.isArray(userInfo) && userInfo.isPortalAdmin) &&
                    (<NavDropdown title="Admin" id='adminmenu'>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/productlist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/orderlist'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>)
                  }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}
