import React, { Component } from 'react';
import {
    Route
  } from 'react-router-dom';
import IntervalRenderer from 'react-interval-renderer';
import Dashboard from './Dashboard.js';
import Lichsu from './Lichsu.js';
class DieuHuongURL extends Component {
    render() {
        return (
  
    <div>
        <IntervalRenderer interval={100} shouldComponentRerender={() => true} componentDidRerender={function(){}}>
            <Route exact path="/" component={Dashboard} ></Route>
            <Route path="/history" component={Lichsu} ></Route>
        </IntervalRenderer>
    </div>
    );
    }
}

export default DieuHuongURL;