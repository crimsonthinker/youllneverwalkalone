import React, { Component } from 'react';
import Chart from './Visual';
import io from 'socket.io-client';
const axios = require('axios');
class Dashboard extends Component {
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
      email: '',
      username: '',
      isheat: false,
      ishumid: true,
      islight: false,
      ishumidsoil: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
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
  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('change', name, value)
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    axios.post('/update', {
      email: this.state.email,
      isheat: this.state.isheat,
      ishumid: this.state.ishumid,
      islight: this.state.islight,
      ishumidsoil: this.state.ishumidsoil
    })
      .then((response) => {
        console.log(response.data[0]);
        this.props.history.replace('/');
      })
      .catch(function (error) {
        alert(error)
      });

  }
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
    if (numrows < 15) {

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
  render() {
    const status = {
      temp: this.state.list_tempe,
      humid: this.state.list_humid,
      soil_humid: this.state.list_soil_humid,
      light: this.state.list_light,
      date: this.state.list_date,
      is_temp: this.state.isheat,
      is_humid: this.state.ishumid,
      is_soil_humid: this.state.ishumidsoil,
      is_light: this.state.islight
    }
    console.log(this.state.isheat, this.state.ishumid, this.state.ishumidsoil, this.state.islight)
    return (
      <div>
        <div className="container-fluid">
          {/* Breadcrumbs*/}
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#">Dashboard</a>
            </li>
            <li className="breadcrumb-item active">Tổng quan</li>
          </ol>
          {/* Icon Cards*/}
          <div className="row">
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-primary o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-comments" />
                  </div>
                  <div className="mr-5">Độ ẩm hiện tại: {this.state.n_humidity} %
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-list" />
                  </div>
                  <div className="mr-5">Nhiệt độ hiện tại: {this.state.n_temperature} độ C</div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-list" />
                  </div>
                  <div className="mr-5">Tình trạng cây trồng: Đang cần tưới</div>
                </div>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-comments" />
                  </div>
                  <div className="mr-5">Ánh sáng hiện tại: {this.state.n_light} lux</div>
                </div>

              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body">
                  <div className="card-body-icon">
                    <i className="fas fa-fw fa-list" />
                  </div>
                  <div className="mr-5">Độ ẩm đất hiện tại: {this.state.n_soil_humidity}</div>
                </div>
              </div>
            </div>

          </div>
          <form id="Login" onSubmit={this.handleSubmit}>

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
                    <input name="ishumid" type="checkbox" checked={this.state.ishumid} id="inlineCheckbox2" onChange={this.handleChange} />
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
            <input type="submit" value="Đăng ký" className="btn btn-danger btn-lg btn3d" />

          </form>

          <div className="row">
            <div className="col-3">
              <button type="button" className="btn btn-success btn-lg btn3d">
                <span className="glyphicon glyphicon-ok" />
                Tưới cây
              </button>
            </div>
            <div className="col-3">
              <button type="button" className="btn btn-primary btn-lg btn3d">
                <span className="glyphicon glyphicon-ok" />
                Chia sẻ TOPIC
              </button>
            </div>
            <div className="col-3">
              <button type="button" className="btn btn-info btn-lg btn3d">
                <span className="glyphicon glyphicon-ok" />
                Chia sẻ biểu đồ
              </button>
            </div>
            <div className="col-3">
              <button type="button" className="btn btn-warning btn-lg btn3d">
                <span className="glyphicon glyphicon-ok" />
                Chia sẻ người dùng
              </button>
            </div>
          </div>



          {/* Area Chart Example*/}
          <div className="card mb-3">
            <div className="card-header">
              <i className="fas fa-chart-area" />
              Biểu đồ
            </div>
            <div className="card-body">
              <div className="chartjs-size-monitor" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}>
                <div className="chartjs-size-monitor-expand" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}>
                  <div style={{ position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0 }} />
                </div>
                <div className="chartjs-size-monitor-shrink" style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1 }}>
                  <div style={{ position: 'absolute', width: '200%', height: '200%', left: 0, top: 0 }} />
                </div>
              </div>

              <div id="temp-chart" className="chart">
                <Chart data={status} />
              </div>
            </div>
          </div>
          {/* DataTables Example */}
          <div className="card mb-3">
            <div className="card-header">
              <i className="fas fa-table" />
              Bảng số liệu</div>
            <div className="card-body">
              <div className="table-responsive">
                <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                  <div className="row">
                    <div className="col-sm-12">
                      <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
                        <thead>
                          <tr role="row">
                            <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: 69 }}>Thời gian</th>
                            <th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: 69 }}>Nhiệt độ</th>
                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: 107 }}>Độ ẩm không khí (%)</th>
                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Office: activate to sort column ascending" style={{ width: 56 }}>Độ ẩm đất (%)</th>
                            <th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Age: activate to sort column ascending" style={{ width: 31 }}>Ánh sáng (lux)</th>
                          </tr>
                        </thead>

                        {this.displayRowdata()}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
            {/* Sticky Footer */}

          </div >
        </div>

      </div>
    );
  }
}

export default Dashboard;