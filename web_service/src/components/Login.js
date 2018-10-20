import React, { Component } from 'react';
import '../Login.css';
import {NavLink} from 'react-router-dom';
const axios = require('axios');
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (e) => {
    alert("email: "+this.state.email+"\n password"+this.state.password);
    e.preventDefault();

      axios.post('/login', {
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
        console.log(response);
        this.props.history.replace('/');
      })
      .catch(function (error) {
        alert("Tài khoản không đúng, vui lòng nhập lại!");
        console.log(error);
      });
      
    } 
    render() {
        return (
          <div id="LoginForm" >
                <div className="container">
  <h1 className="form-heading">SMART FARM</h1>
  <div className="login-form">
    <div className="main-div">
      <div className="panel">
        <h2>ĐĂNG NHẬP</h2>
        <p>Nhập tài khoản để sử dụng hệ thống</p>
      </div>
      <form id="Login" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <input name="email" type="email" className="form-control" id="inputEmail" placeholder="Tên tài khoản" value={this.state.email} onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <input name="password" type="password" className="form-control" id="inputPassword" placeholder="Mật khẩu" value={this.state.password} onChange={this.handleChange}/>
        </div>
        
        <input type="submit" value="Đăng nhập" className="btn btn-success btn-lg btn3d"/>
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