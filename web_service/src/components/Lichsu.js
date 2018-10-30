import React, { Component } from 'react';
import io from 'socket.io-client';
class Lichsu extends Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      n_temperature: "...",
      n_humidity: "...",
      n_soil_humidity: "...",
      n_light: "..."
=======
      n_temperature: "",
      n_humidity:"",
      n_soil_humidity: "",
      n_light: "",
      list_tempe:[],
      list_humid:[],
      list_soil_humid:[],
      list_light:[],
      list_date:[]
>>>>>>> master
    }
    this.socket = null;
    this.queue_max_size = 10;
  }
  componentWillMount() {
<<<<<<< HEAD
    this.socket = io('localhost:');
    this.socket.on('newMessage', (response) => { this.newMessage(response) }); //lắng nghe event 'newMessage' và gọi hàm newMessage khi có event
=======
    this.socket = io('localhost:9093');
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
>>>>>>> master
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
<<<<<<< HEAD
  };
  render() {
    return (
      <div className="col-sm-12">
        <p>{this.state.n_temperature},{this.state.n_humidity},{this.state.n_soil_humidity},{this.state.n_light}</p>
        <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{ width: '100%' }}>
          <thead>
            <tr role="row"><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: 69 }}>Thời gian</th><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{ width: 69 }}>Nhiệt độ</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{ width: 107 }}>Độ ẩm không khí (%)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Office: activate to sort column ascending" style={{ width: 56 }}>Độ ẩm đất (%)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Age: activate to sort column ascending" style={{ width: 31 }}>Ánh sáng (nits)</th></tr>
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
=======
  }; 
  displayRowdata(){
    var list_date=this.state.list_date;
    var list_humid=this.state.list_humid;
    var list_tempe=this.state.list_tempe;
    var list_soil_humid=this.state.list_soil_humid;
    var list_light=this.state.list_light;
    var rows = [];
    var numrows=this.state.list_date.length;
    if(numrows<30){

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
            <div className="col-sm-12">
                <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing={0} role="grid" aria-describedby="dataTable_info" style={{width: '100%'}}>
                    <thead>
                      <tr role="row"><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: 69}}>Thời gian</th><th className="sorting_asc" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending" style={{width: 69}}>Nhiệt độ</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Position: activate to sort column ascending" style={{width: 107}}>Độ ẩm không khí (%)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Office: activate to sort column ascending" style={{width: 56}}>Độ ẩm đất (%)</th><th className="sorting" tabIndex={0} aria-controls="dataTable" rowSpan={1} colSpan={1} aria-label="Age: activate to sort column ascending" style={{width: 31}}>Ánh sáng (nits)</th></tr>
                    </thead>
                    {this.displayRowdata()}
                  </table>
                  <div className="col-11"><button type="button" className="btn btn-success btn-lg btn3d float-right"><span className="glyphicon glyphicon-ok" /> Ghi dữ liệu</button></div>
            </div>
        );
    }
>>>>>>> master
}

export default Lichsu;