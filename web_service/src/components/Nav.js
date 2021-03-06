import React, { Component } from 'react';
import '../App.css';
import '../Button.css';
import {NavLink} from 'react-router-dom';
const axios = require('axios');
class Nav extends Component {
  change = async (e) => {
    e.preventDefault();

      axios.post('/logout', {
        email:localStorage.getItem('email')
      })
      .then((response)=> {
        console.log(response);
        localStorage.removeItem('email');
        //localStorage.removeItem('email')
        window.location.replace('/login');
      })
      .catch(function (error) {
        
        alert(error);
      });
      
    } 
    render() {
        return (
          <div >
 <nav className="navbar navbar-expand navbar-dark bg-success static-top">
  <a className="navbar-brand mr-1" href="index.html">Smart Farm</a>
  <button className="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
  <img src="http://www.pngall.com/wp-content/uploads/2017/05/Save-Tree-PNG.png" alt="Smiley face" height="42" width="42"/>
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
      

        <a className="dropdown-item" onClick={this.change}>Logout</a>
        
      </div>
     
    </li>
  </ul>
</nav>





</div>

        );
    }
}

export default Nav;