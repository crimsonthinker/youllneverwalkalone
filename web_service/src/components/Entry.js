import React, { Component } from 'react';
import {
    BrowserRouter as Router
   } from 'react-router-dom';
import DieuHuongLogin from './DieuHuongLogin';
class Entry extends Component {
    render() {
        return (
            <Router>
            <div id="LoginForm">
                <DieuHuongLogin/>
            </div>
            </Router>
        );
    }
}

export default Entry;