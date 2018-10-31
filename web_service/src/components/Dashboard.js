import React, { Component } from 'react';
import io from 'socket.io-client';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.server_addr = "192.168.43.242";
    this.state = {
        n_temperature: "",
        n_humidity:"",
        n_soil_humidity: "",
        n_light: "",
        list_tempe:[],
        list_humid:[],
        list_soil_humid:[],
        list_light:[],
        list_date:[]
    }
    this.socket = null;
    this.queue_max_size = 10;
  }

  componentWillMount() {
    this.socket = io(this.server_addr + ':9093');
    this.socket.on('newMessage', (response) => {
      
      this.newMessage(response);
      this.setState((previousState, currentProps) => {
        console.log(previousState, currentProps)
          return {
            list_tempe:previousState.list_tempe.concat([this.state.n_temperature]),
            list_humid:previousState.list_humid.concat([this.state.n_humidity]),
            list_light: previousState.list_light.concat([this.state.n_light]),
            list_soil_humid:previousState.list_soil_humid.concat([this.state.n_soil_humidity]),
            list_date:previousState.list_date.concat([Date(Date.now()).toString()])
          };
      });
    }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
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
  displayRowdata(){
    
    var list_date=this.state.list_date;
    var list_humid=this.state.list_humid;
    var list_tempe=this.state.list_tempe;
    var list_soil_humid=this.state.list_soil_humid;
    var list_light=this.state.list_light;
    var rows = [];
    var numrows=this.state.list_date.length;
    if(numrows<15){

      for (var i = 0; i < numrows; i++) {
          // note: we add a key prop here to allow react to uniquely identify each
          // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
          if(i%2==1)
          {
            rows.push(<tr role="row" className="odd"><td>{list_date[numrows-i-1]}</td><td>{list_tempe[numrows-i-1]}</td><td>{list_humid[numrows-i-1]}</td><td>{list_soil_humid[numrows-i-1]}</td><td>{list_light[numrows-i-1]}</td></tr>);
          }
          else 
          {
            rows.push(<tr role="row" className="even"><td>{list_date[numrows-i-1]}</td><td>{list_tempe[numrows-i-1]}</td><td>{list_humid[numrows-i-1]}</td><td>{list_soil_humid[numrows-i-1]}</td><td>{list_light[numrows-i-1]}</td></tr>);
          }
        }
      }
      else{
        for (var i = 0; i < 15; i++) {
          // note: we add a key prop here to allow react to uniquely identify each
          // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
          if(i%2==1)
          {
            rows.push(<tr role="row" className="odd"><td>{list_date[numrows-i-1]}</td><td>{list_tempe[numrows-i-1]}</td><td>{list_humid[numrows-i-1]}</td><td>{list_soil_humid[numrows-i-1]}</td><td>{list_light[numrows-i-1]}</td></tr>);
          }
          else 
          {
            rows.push(<tr role="row" className="even"><td>{list_date[numrows-i-1]}</td><td>{list_tempe[numrows-i-1]}</td><td>{list_humid[numrows-i-1]}</td><td>{list_soil_humid[numrows-i-1]}</td><td>{list_light[numrows-i-1]}</td></tr>);
          }
        }
      }


return <tbody>{rows}</tbody>;
  }
    render() {
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
              <div className="mr-5">Độ ẩm hiện tại: {this.state.n_humidity}</div>
            </div>
         
          </div>
        </div>
        <div className="col-xl-4 col-sm-6 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="card-body-icon">
                <i className="fas fa-fw fa-list" />
              </div>
              <div className="mr-5">Nhiệt độ hiện tại: {this.state.n_temperature}</div>
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
              <div className="mr-5">Ánh sáng hiện tại: {this.state.n_light}</div>
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
      <div className="form-group">
        <label for="gender1" className="col-sm-4 control-label">Chọn TOPIC cần đăng ký thêm:</label>
        <div className="col-sm-4">
        <select className="form-control selcls" id="gender1">
          <option>Nhiệt độ</option>
          <option>Độ ẩm </option>
          <option>Ánh sáng </option>
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
                      <tr role="row"><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: 69}}>Thời gian</th><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: 69}}>Nhiệt độ</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{width: 107}}>Độ ẩm không khí (%)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Office: activate to sort column ascending" style={{width: 56}}>Độ ẩm đất (%)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Age: activate to sort column ascending" style={{width: 31}}>Ánh sáng (lux)</th></tr>
                    </thead>
                    
                    {this.displayRowdata()}
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