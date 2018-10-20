import React, { Component } from 'react';
import io from 'socket.io-client';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
        n_temperature: "...",
        n_humidity:"...",
        n_soil_humidity: "...",
        n_light: "..."
    }
    this.socket = null;
    this.queue_max_size = 10;
  }
  componentWillMount() {
    this.socket = io('localhost:9093');
    this.socket.on('newMessage', (response) => {this.newMessage(response)}); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
  }
  newMessage(m) {
    var tmp = m.substr(1,m.length - 2).split(',');
    console.log(tmp.toString())
    this.setState({
        n_temperature: tmp[0],
        n_humidity:tmp[1],
        n_soil_humidity: tmp[2],
        n_light: tmp[3]
    });
  }; 
    render() {
        return (
            <div>
        <p>{this.state.n_temperature},{this.state.n_humidity},{this.state.n_soil_humidity},{this.state.n_light}</p>
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
              <div className="mr-5">Độ ẩm hiện tại: 98%</div>
            </div>
         
          </div>
        </div>
        <div className="col-xl-4 col-sm-6 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fas fa-fw fa-list" />
              </div>
              <div className="mr-5">Nhiệt độ hiện tại: 32 độ C</div>
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
      <div className="form-group">
        <label for="gender1" className="col-sm-4 control-label">Chọn TOPIC cần đăng ký thêm:</label>
        <div className="col-sm-4">
        <select className="form-control selcls" id="gender1">
          <option>Nhiệt độ user A</option>
          <option>Độ ẩm user B</option>
          <option>Ánh sáng user C</option>
        </select>          
        <button type="button" className="btn btn-danger btn-lg btn3d"><span className="glyphicon glyphicon-ok" /> Đăng ký</button>
        </div>
</div>   

      <div className="row">
  <div className="col-3"><button type="button" className="btn btn-success btn-lg btn3d"><span className="glyphicon glyphicon-ok" /> Tưới cây</button></div>
  <div className="col-3"><button type="button" className="btn btn-primary btn-lg btn3d"><span className="glyphicon glyphicon-ok" /> Chia sẻ TOPIC</button></div>
  <div className="col-3"><button type="button" className="btn btn-info btn-lg btn3d"><span className="glyphicon glyphicon-ok" /> Chia sẻ biểu đồ</button>
</div>
  <div className="col-3"><button type="button" className="btn btn-warning btn-lg btn3d"><span className="glyphicon glyphicon-ok" /> Chia sẻ người dùng</button></div>
</div>

    

      {/* Area Chart Example*/}
      <div className="card mb-3">
        <div className="card-header">
          <i className="fas fa-chart-area" />
          Biểu đồ</div>
        <div className="card-body"><div className="chartjs-size-monitor" style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div className="chartjs-size-monitor-expand" style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div style={{position: 'absolute', width: 1000000, height: 1000000, left: 0, top: 0}} /></div><div className="chartjs-size-monitor-shrink" style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', visibility: 'hidden', zIndex: -1}}><div style={{position: 'absolute', width: '200%', height: '200%', left: 0, top: 0}} /></div></div>
          <canvas id="myAreaChart" width={644} height={193} style={{display: 'block', width: 644, height: 193}} className="chartjs-render-monitor" />
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
            <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{width: '100%'}}>
                    <thead>
                      <tr role="row"><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: 69}}>Thời gian</th><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: 69}}>Nhiệt độ</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{width: 107}}>Độ ẩm không khí (%)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Office: activate to sort column ascending" style={{width: 56}}>Độ ẩm đất (%)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Age: activate to sort column ascending" style={{width: 31}}>Ánh sáng (nits)</th></tr>
                    </thead>
                    
                    <tbody>
                      <tr role="row" className="odd">
                      <td>6th Octorber 2018 12:13:14 PM</td>
                        <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr><tr role="row" className="even">
                      <td>6th Octorber 2018 12:13:14 PM</td>

                      <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr><tr role="row" className="odd">
                      <td>6th Octorber 2018 12:13:14 PM</td>

                      <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr><tr role="row" className="even">
                      <td>6th Octorber 2018 12:13:14 PM</td>

                      <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr><tr role="row" className="odd">
                      <td>6th Octorber 2018 12:13:14 PM</td>

                      <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr><tr role="row" className="even">
                      <td>6th Octorber 2018 12:13:14 PM</td>

                      <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr><tr role="row" className="odd">
                      <td>6th Octorber 2018 12:13:14 PM</td>

                      <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr><tr role="row" className="even">
                      <td>6th Octorber 2018 12:13:14 PM</td>

                      <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr><tr role="row" className="odd">
                      <td>6th Octorber 2018 12:13:14 PM</td>

                      <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr><tr role="row" className="even">
                      <td>6th Octorber 2018 12:13:14 PM</td>

                      <td>98</td>
                        <td>98</td>
                        <td>33</td>
                        <td>300</td>
                      </tr></tbody>
                  </table></div></div>
                  </div>
          </div>
        </div>
      </div>
    </div>
    {/* /.container-fluid */}
    {/* Sticky Footer */}
   
  </div>
            
        );
    }
}

export default Dashboard;