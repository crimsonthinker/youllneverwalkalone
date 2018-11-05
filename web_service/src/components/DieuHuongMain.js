import React, { Component } from 'react';
import {
    Route, Switch
} from 'react-router-dom';
import MainScreen from './MainScreen';
import Register from './Register';
import Login from './Login';
class DieuHuongMain extends Component {
    render() {
        return (
            <div>
                <Switch>

                    <Route path="/register" component={Register}></Route>
                    <Route path="/login" component={Login} ></Route>
                    <Route path="/" component={MainScreen} ></Route>


                </Switch>


            </div>
        );
    }
}

export default DieuHuongMain;