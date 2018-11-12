import React, { Component } from 'react';
import io from 'socket.io-client';
const axios = require('axios');
class Lichsu extends Component {
  constructor(props) {
    super(props);
    this.server_addr = "192.168.43.27";
    this.state = {
      n_temperature: "",
      n_humidity: "",
      n_soil_humidity: "",
      n_light: "",
      list_tempe: [],
      list_humid: [],
      list_soil_humid: [],
      list_light: [],
      list_date: [],
      email: "",
      username: "",
      isheat: false,
      ishumid: false,
      islight: false,
      ishumidsoil: false,
      controlButton: true,
      date: ""
    }
    this.socket = null;
    this.queue_max_size = 10;
  }
  componentDidMount() {
    axios.get('/current_login?email=' + localStorage.getItem('email'))
      .then((response) => {
        console.log('=', response.data)
        this.setState({
          ...response.data
        });
      })
      .catch(function (error) {
        alert(error)
      });
  }
  componentWillMount() {
    this.socket = io(this.server_addr + ':9093');
    this.socket.on('newMessage', (response) => {

      this.newMessage(response);
      this.setState((previousState, currentProps) => {
        console.log(previousState, currentProps)
        return {
          list_tempe: previousState.list_tempe.concat([this.state.n_temperature]),
          list_humid: previousState.list_humid.concat([this.state.n_humidity]),
          list_light: previousState.list_light.concat([this.state.n_light]),
          list_soil_humid: previousState.list_soil_humid.concat([this.state.n_soil_humidity]),
          list_date: previousState.list_date.concat([Date(Date.now()).toString()])
        };
      });
    }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
  }
  newMessage(m) {
    var tmp = m.substr(1, m.length - 2).split(',');
    console.log(tmp.toString())
    this.setState({
      n_temperature: tmp[0],
      n_humidity: tmp[1],
      n_soil_humidity: tmp[2],
      n_light: tmp[3]
    });
  };
  displayRowdata() {
    var list_date = this.state.list_date;
    var list_humid = this.state.list_humid;
    var list_tempe = this.state.list_tempe;
    var list_soil_humid = this.state.list_soil_humid;
    var list_light = this.state.list_light;
    var rows = [];
    var numrows = this.state.list_date.length;
    if (this.state.isheat == false) {
      for (var i = 0; i < numrows; i++) {
        list_tempe[i] = "Not allow";
      }
    }
    if (this.state.ishumid == false) {
      for (var i = 0; i < numrows; i++) {
        list_humid[i] = "Not allow";
      }
    }
    if (this.state.islight == false) {
      for (var i = 0; i < numrows; i++) {
        list_light[i] = "Not allow";
      }
    }
    if (this.state.ishumidsoil == false) {
      for (var i = 0; i < numrows; i++) {
        list_soil_humid[i] = "Not allow";
      }
    }
    if (numrows < 30) {

      for (var i = 0; i < numrows; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        if (i % 2 == 1) {
          rows.push(<tr role="row" className="odd"><td>{list_date[numrows - i - 1]}</td><td>{list_tempe[numrows - i - 1]}</td><td>{list_humid[numrows - i - 1]}</td><td>{list_soil_humid[numrows - i - 1]}</td><td>{list_light[numrows - i - 1]}</td></tr>);
        }
        else {
          rows.push(<tr role="row" className="even"><td>{list_date[numrows - i - 1]}</td><td>{list_tempe[numrows - i - 1]}</td><td>{list_humid[numrows - i - 1]}</td><td>{list_soil_humid[numrows - i - 1]}</td><td>{list_light[numrows - i - 1]}</td></tr>);
        }
      }
    }
    else {
      for (var i = 0; i < 15; i++) {
        // note: we add a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        if (i % 2 == 1) {
          rows.push(<tr role="row" className="odd"><td>{list_date[numrows - i - 1]}</td><td>{list_tempe[numrows - i - 1]}</td><td>{list_humid[numrows - i - 1]}</td><td>{list_soil_humid[numrows - i - 1]}</td><td>{list_light[numrows - i - 1]}</td></tr>);
        }
        else {
          rows.push(<tr role="row" className="even"><td>{list_date[numrows - i - 1]}</td><td>{list_tempe[numrows - i - 1]}</td><td>{list_humid[numrows - i - 1]}</td><td>{list_soil_humid[numrows - i - 1]}</td><td>{list_light[numrows - i - 1]}</td></tr>);
        }
      }
    }


    return <tbody>{rows}</tbody>;
  }
  recordingOff() {
    var request = new XMLHttpRequest();
    var port = 9094;
    request.open('GET', 'http://' + this.server_addr + ":9094" + "?username=" + this.state.username + "&?datemark=" + this.state.date, true);
    request.send()
  }

  recordingSave() {
    this.setState({
      controlButton: true
    });
    var request = new XMLHttpRequest();
    var ion = 'http://' + this.server_addr + ":9094" + "?username=" + this.state.username + "&?datemark=" + this.state.date;
    console.log(ion);
    request.open('POST', ion, true);
    request.send()
    const FileDownload = require('js-file-download');
    axios.get('http://' + this.server_addr + ':9094' + + "?username=" + this.state.username + "&?datemark=" + this.state.date + '.txt')
      .then((response) => {
        console.log(response)
        FileDownload(response.data, 'report.txt');
      });

  }

  recordingOn() {

    var request = new XMLHttpRequest();
    var port = 9094;
    var dato = String(new Date());
    request.open('GET', 'http://' + this.server_addr + ":" + port.toString() + "?username=" + this.state.username + "&datemark=" + dato, true);
    request.send()
    this.setState({
      controlButton: false,
      date: dato
    });
  }
  displayButton() {
    if (this.state.controlButton == true) {
      return (
        <div className="col-11">
          <button type="button" className="btn btn-success btn-lg btn3d float-r/ight" onClick={() => this.recordingOn()}><span className="glyphicon glyphicon-ok" /> Ghi dữ liệu</button>
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="col-9">
            <button type="button" className="btn btn-danger btn-lg btn3d float-right" onClick={() => this.recordingOff()}><span className="glyphicon glyphicon-ok" /> Stop</button>
          </div>
          <div className="col-3">
            <button type="button" className="btn btn-info btn-lg btn3d float-right" onClick={() => this.recordingSave()}><span className="glyphicon glyphicon-ok" /> Save</button>
          </div>
        </div>

      )
    }
  }
  render() {
    return (
      <div className="col-sm-12">
        {this.displayButton()}
        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
          <thead>
            <tr role="row"><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: 69 }}>Thời gian</th><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: 69 }}>Nhiệt độ (độ C)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: 107 }}>Độ ẩm không khí (%)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Office: activate to sort column ascending" style={{ width: 56 }}>Độ ẩm đất</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Age: activate to sort column ascending" style={{ width: 31 }}>Ánh sáng (lux)</th></tr>
          </thead>
          {this.displayRowdata()}
        </table>

      </div>
    );
  }
}
export default Lichsu;