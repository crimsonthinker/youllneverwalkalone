import React, { Component } from 'react';
import '../App.css';
import '../Button.css';
class Nav extends Component {
    render() {
        return (
          <div >
 <nav className="navbar navbar-expand navbar-dark bg-success static-top">
  <a className="navbar-brand mr-1" href="index.html">Smart Farm</a>
  <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
    <i className="fas fa-bars" />
  </button>
  {/* Navbar Search */}
  <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
 
  </form>
  {/* Navbar */}
  <ul className="navbar-nav ml-auto ml-md-0">
    <li className="nav-item dropdown no-arrow">
      <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-user-circle fa-fw" />
      </a>
      <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
      
        <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
      </div>
    </li>
  </ul>
</nav>





</div>

        );
    }
}

export default Nav;