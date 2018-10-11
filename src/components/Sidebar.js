import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <div>
                 <ul className="sidebar navbar-nav toggled">
    <li className="nav-item active">
      <a className="nav-link" href="index.html">
        <i className="fas fa-fw fa-tachometer-alt" />
        <span>Dashboard</span>
      </a>
    </li>
    <li className="nav-item active">
      <a className="nav-link" href="index.html">
        <i className="fas fa-fw fa-history" />
        <span>History</span>
      </a>
    </li>
  
   
  </ul>
            </div>
        );
    }
}

export default Sidebar;