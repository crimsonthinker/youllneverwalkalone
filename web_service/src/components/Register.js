import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../Register.css';
class Register extends Component {
    render() {
        return (
            <div id="LoginForm">

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
                  <div className="form-group">
                    <div className="col-md-7">
                    <div className="panel">
                  <p>Chọn TOPIC:</p>
                </div>
                      <fieldset>
                        <div className="checkbox checkbox-danger checkbox-inline float-left">
                          <input type="checkbox" id="inlineCheckbox1" defaultValue="option1" />
                          <label htmlFor="inlineCheckbox1"> Nhiệt độ </label>
                        </div>
                        <div className="checkbox checkbox-success checkbox-inline float-left">
                          <input type="checkbox" id="inlineCheckbox2" defaultValue="option1" />
                          <label htmlFor="inlineCheckbox2"> Độ ẩm </label>
                        </div>
                        <div className="checkbox checkbox-info checkbox-inline float-left">
                          <input type="checkbox" id="inlineCheckbox3" defaultValue="option1" />
                          <label htmlFor="inlineCheckbox3"> Ánh sáng </label>
                        </div>
                        <div className="checkbox checkbox-warning checkbox-inline float-left">
                          <input type="checkbox" id="inlineCheckbox4" defaultValue="option1" />
                          <label htmlFor="inlineCheckbox4"> Độ ẩm đất </label>
                        </div>
                      </fieldset>
                    </div>
                  </div>


                  <NavLink to="/register">
                  <button type="submit" className="btn btn-success btn-lg btn3d">Đăng ký</button>
                  </NavLink>
                    <NavLink to="/login">
                  <button type="submit" className="btn btn-info btn-lg btn3d">Trở về</button>
                  </NavLink>
                </form>
              </div>
              <p className="botto-text"> Designed by Youllneverwalkalone</p>
            </div></div>
            </div>
            
        );
    }
}

export default Register;