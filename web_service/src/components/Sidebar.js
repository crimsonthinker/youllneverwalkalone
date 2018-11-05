import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Sidebar extends Component {
  render() {
    return (
      <div>
        <ul className="sidebar navbar-nav toggled">

          <li className="nav-item active">
            <NavLink to="/">
              <a className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink to="/history">
              <a className="nav-link" >
                <i className="fas fa-fw fa-history" />
                <span>History</span>
              </a>
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink to="/chiase">
              <a className="nav-link" >
                <i className="fas fa-fw fa-share" />
                <span>Share</span>
              </a>
            </NavLink>
          </li>


        </ul>
      </div>
    );
  }
}

export default Sidebar;