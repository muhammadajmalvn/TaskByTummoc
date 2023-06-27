import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import { NavLink, useNavigate } from 'react-router-dom';
import Image from '../public/logoHeader.png'
import { logout } from '../Redux/Actions/actions'

export default function App() {
  const [showNavColor, setShowNavColor] = useState(false);
  const logOut = () => {
    localStorage.removeItem("userData")
    window.location.reload()
  }
  return (
    <>
      <MDBNavbar expand='lg' dark style={{ backgroundColor: '#0e2d39' }}>
        <MDBContainer fluid>
          <MDBNavbarBrand ><img src={Image} /></MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <NavLink exact to='/' className='text-white mx-5'>
                  Home
                </NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink exact to='/cities' className='text-white mx-5'>View Cities</NavLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <NavLink className='text-white mx-5' onClick={logOut}><i className="fa-solid fa-power-off"></i> Logout</NavLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}