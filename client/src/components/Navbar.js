import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import image from "../logo-wIdo-navbar.png";

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    <MDBNavbar color="default-color" dark expand="md">
      <MDBNavbarBrand>
        <img src={image} alt="logo-wIdo" className="logo-navbar"></img>
      </MDBNavbarBrand>
      <MDBNavbarToggler onClick={this.toggleCollapse} />
      <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
        <MDBNavbarNav left>
          <MDBNavItem active>
            <MDBNavLink to="Home">Home</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="Profile">Profile</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#!">Manager Map</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#!">Friends</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink to="#!">Community</MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <div className="d-none d-md-inline">Graphics</div>
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem href="#!">Users More Traveler</MDBDropdownItem>
                <MDBDropdownItem href="#!">Most Visited Countries</MDBDropdownItem>
                <MDBDropdownItem href="#!">More Follower Users</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
        <MDBNavbarNav right>
          <MDBNavItem>
            <MDBNavLink className="waves-effect waves-light" to="#!">
              <MDBIcon fab icon="twitter" />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBNavLink className="waves-effect waves-light" to="#!">
              <MDBIcon fab icon="google-plus-g" />
            </MDBNavLink>
          </MDBNavItem>
          <MDBNavItem>
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <MDBIcon icon="user" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="dropdown-default">
                <MDBDropdownItem>Edit Profile</MDBDropdownItem>
                <MDBDropdownItem>Change Password</MDBDropdownItem>
                <hr></hr>
                <MDBDropdownItem>Invite Friends</MDBDropdownItem>
                <MDBDropdownItem>About Us</MDBDropdownItem>
                <hr></hr>
                <MDBDropdownItem onClick={this.props.logout}>Logout</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBNavItem>
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
    );
  }
}

export default NavbarPage;