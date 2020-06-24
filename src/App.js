import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ff_data from 'media/result.json';

var ff_json = require('./media/result.json');

var data = [];

const tech_companies = [
  { label: "Apple", value: 1},
  { label: "Facebook", value: 2 },
  { label: "Netflix", value: 3 },
  { label: "Tesla", value: 4 },
  { label: "Amazon", value: 5 },
  { label: "Alphabet", value: 6 },
];

class App extends React.Component {

  load_json() {
    for(let i = 0; i < ff_json.length; i++) {
      var temp = ff_json[i];
      var temp_two = {label: temp.Player, value: temp.field1};
      data[i] = temp_two;
    }
  }

  render() {
    this.load_json();
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <Select options={ data } />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    );
  }
}

export default App;
