import React, { Component } from 'react';

class Footer extends Component {
    render() {
        return (
            <div>
                 <footer>
  <div className="container-fluid bg-primary py-3">
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <div className="row py-0">
            <div className="col-sm-1 hidden-md-down">
              
            </div>
            <div className="col-sm-11 text-white">
              <div><h4>&nbsp;&nbsp;Copyright</h4>
                <p>&nbsp;&nbsp;&nbsp;<span className="header-font"></span><span className="header-font"></span>SmartFarm By Youllneverwalkalone@2018</p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="d-inline-block">
            <div className="bg-circle-outline d-inline-block" style={{backgroundColor: '#3b5998'}}>
              <a href="https://www.facebook.com/"><i className="fa fa-3x fa-fw fa-facebook text-white" />
              </a>
            </div>
            <div className="bg-circle-outline d-inline-block" style={{backgroundColor: '#d34836'}}>
              <a href="https://www.google.com/">
                <i className="fa fa-3x fa-fw fa-google text-white" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>

            </div>
        );
    }
}

export default Footer;