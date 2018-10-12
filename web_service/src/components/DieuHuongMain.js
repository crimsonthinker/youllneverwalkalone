import React, { Component } from 'react';
import {
    Route
  } from 'react-router-dom';
import Entry from './Entry';
import MainScreen from './MainScreen';
class DieuHuongMain extends Component {
    render() {
        return (
            <div>
     
            <Route exact path="/login" component={Entry} ></Route>
            <Route exact path="/" component={MainScreen} ></Route>
    
        
        
        </div>
        );
    }
}

export default DieuHuongMain;