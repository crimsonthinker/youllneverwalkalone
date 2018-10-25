import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import '../Register.css';
const axios = require('axios');
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password:'',
      username:'',
      isheat:false,
      ishumid:false,
      islight:false,
      ishumidsoil:false
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
    alert("email: "+this.state.email+"\n password: "+this.state.password+"\n username: "+this.state.username);
    e.preventDefault();

      axios.post('/register', {
        email: this.state.email,
        password: this.state.password,
        username:this.state.username,
        isheat:this.state.isheat,
        ishumid:this.state.ishumid,
        islight:this.state.islight,
        ishumidsoil:this.state.ishumidsoil
      })
      .then(function (response) {
        console.log(response);
        this.props.history.replace('/login');
      })
      .catch(function (error) {
        alert(error)
      });
      
    } 
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
                <form id="Login" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input name="email" type="email" value={this.state.email} className="form-control" id="inputEmail" placeholder="Email" onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <input name="password" type="password" value={this.state.password} className="form-control" id="inputPassword" placeholder="Mật khẩu" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <input name="username" type="username" value={this.state.username} className="form-control" id="inputName" placeholder="Tên người dùng" onChange={this.handleChange}/>
                  </div>
                  <div className="form-group">
                    <div className="col-md-7">
                    <div className="panel">
                  <p>Chọn TOPIC:</p>
                </div>
                      <fieldset>
                        <div className="checkbox checkbox-danger checkbox-inline float-left">
                          <input name="isheat" type="checkbox" checked={this.state.isheat} id="inlineCheckbox1" onChange={this.handleChange} />
                          <label htmlFor="inlineCheckbox1"> Nhiệt độ </label>
                        </div>
                        <div className="checkbox checkbox-success checkbox-inline float-left">
                          <input name="ishumid" type="checkbox" checked={this.state.ishumid} id="inlineCheckbox2" onChange={this.handleChange}/>
                          <label htmlFor="inlineCheckbox2"> Độ ẩm </label>
                        </div>
                        <div className="checkbox checkbox-info checkbox-inline float-left">
                          <input name="islight" type="checkbox" checked={this.state.islight} id="inlineCheckbox3" onChange={this.handleChange} />
                          <label htmlFor="inlineCheckbox3"> Ánh sáng </label>
                        </div>
                        <div className="checkbox checkbox-warning checkbox-inline float-left">
                          <input name="ishumidsoil" type="checkbox" checked={this.state.ishumidsoil} id="inlineCheckbox4" onChange={this.handleChange} />
                          <label htmlFor="inlineCheckbox4"> Độ ẩm đất </label>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                  <input type="submit" value="Đăng ký" className="btn btn-success btn-lg btn3d"/>
                
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