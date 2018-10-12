import React, { Component } from 'react';
import {
    Route
  } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
class DieuHuongLogin extends Component {
    render() {
        return (
            <div>
     
            <Route exact path="/login" component={Login} ></Route>
            <Route exact path="/register" component={Register} ></Route>
    
        
        
        </div>
        );
    }
}

export default DieuHuongLogin;