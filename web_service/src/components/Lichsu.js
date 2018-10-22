import React, { Component } from 'react';
import io from 'socket.io-client';
class Lichsu extends Component {
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
            <div className="col-sm-12">
            <p>{this.state.n_temperature},{this.state.n_humidity},{this.state.n_soil_humidity},{this.state.n_light}</p>
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
                  </table>
                  <div className="col-11"><button type="button" className="btn btn-success btn-lg btn3d float-right"><span className="glyphicon glyphicon-ok" /> Ghi dữ liệu</button></div>
            </div>
        );
    }
}

export default Lichsu;