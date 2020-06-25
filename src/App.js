import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ff_data from 'media/result.json';

var ff_json = require('./media/result.json');

var data = [];

class Button extends React.Component {
  handleClick() {

  }

  render() {
    return (
      <button type = "button" className = "btn btn-light">
        Select
      </button>
    );
  }
}

class App extends React.Component {
  render() {
    return(
      <div className = "container">
        <div className = "row">
          <div className = "col-md-4"></div>
          <div className = "col-md-4">
            <p>FFAnalysis</p>
          </div>
          <div className = "col-md-4"></div>
        </div>
        <div className = "row">
          <div className = "col-md-4"></div>
          <div className = "col-md-4">
            <Dropdown />
          </div>
          <div className = "col-md-4">
            <Button />
          </div>
        </div>
      </div>
    );
  }
}

class Dropdown extends React.Component {
  state = {
    selected: null,
  }

  handleChange = selected => {
    this.setState({selected});
    //console.log('Option selected:', selected);
  };

  load_json() {
    for(let i = 0; i < ff_json.length; i++) {
      var temp = ff_json[i];
      var temp_two = {label: temp.Player, value: temp.Player};
      data[i] = temp_two;
    }
  }

  render() {
    const {selected} = this.state;

    this.load_json();
    return (
      <Select 
        value = {selected}
        onChange = {this.handleChange}
        options = {data} 
      />

    );
  }
}

export default App;
