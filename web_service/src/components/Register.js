import React, { Component } from 'react';

class Register extends Component {
    render() {
        return (
            <div className="container">
            <h1 className="form-heading">SMART FARM</h1>
            <div className="login-form">
              <div className="main-div">
                <div className="panel">
                  <h2>ĐĂNG KÝ TÀI KHOẢN</h2>
                  <p>Đăng ký tài khoản để sử dụng hệ thống</p>
                </div>
                <form id="Login">
                  <div className="form-group">
                    <input type="email" className="form-control" id="inputEmail" placeholder="Tên tài khoản" />
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="inputPassword" placeholder="Mật khẩu" />
                  </div>
                  <div className="form-group">
                    <input type="name" className="form-control" id="inputName" placeholder="Tên người dùng" />
                  </div>

                  
                  <button type="submit" className="btn btn-success btn-lg btn3d">Đăng ký</button>
                  <button type="submit" className="btn btn-info btn-lg btn3d">Trở về</button>
                </form>
              </div>
              <p className="botto-text"> Designed by Youllneverwalkalone</p>
            </div></div>
        );
    }
}

export default Register;