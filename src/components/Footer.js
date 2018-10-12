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
        <div className="col-md-3">
        <img className="float-right" src="http://pluspng.com/img-png/logo-liverpool-fc-png-liverpool-fc-logo-500.png" width="80" height="80"></img>
        </div>
        <div className="col-md-2">
        <img src="https://png2.kisspng.com/20180419/pue/kisspng-agriculture-smart-farm-systems-inc-irrigation-co-farm-logo-5ad83480e37b72.7947150815241186569318.png" width="130" height="80"></img>
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