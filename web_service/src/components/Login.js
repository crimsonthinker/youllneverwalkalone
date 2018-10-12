import React, { Component } from 'react';
import '../Login.css';
import {NavLink} from 'react-router-dom';
class Login extends Component {
    render() {
        return (
          <div id="LoginForm">
                <div className="container">
  <h1 className="form-heading">SMART FARM</h1>
  <div className="login-form">
    <div className="main-div">
      <div className="panel">
        <h2>ĐĂNG NHẬP</h2>
        <p>Nhập tài khoản để sử dụng hệ thống</p>
      </div>
      <form id="Login">
        <div className="form-group">
          <input type="email" className="form-control" id="inputEmail" placeholder="Tên tài khoản" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" id="inputPassword" placeholder="Mật khẩu" />
        </div>
        <NavLink to="/">
        <button type="submit" className="btn btn-success btn-lg btn3d">Đăng nhập</button>
        </NavLink>
        <NavLink to="/register">
        <button type="submit" className="btn btn-info btn-lg btn3d">Đăng ký</button>
        </NavLink>
      </form>
    </div>
    <p className="botto-text"> Designed by Youllneverwalkalone</p>
  </div></div>
  </div>
            
        );
    }
}

export default Login;