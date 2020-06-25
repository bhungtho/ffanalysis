import React from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ff_data from 'media/result.json';

var ff_json = require('./media/result.json');

var data = [];


function Button(props) {
  return (
    <button type = "button" className = "btn btn-light" onClick = {props.onClick}>
      Select
    </button>
  );
}


/*
class Button extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <button type = "button" className = "btn btn-light" onClick = {this.props.handleClick}>
        Select
      </button>
    );
  }
}
*/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null,
    };

    this.handler = this.handler.bind(this);
  }

  handler(selected) {
    this.setState({
      selected: selected,
    });
    //console.log(this.state.selected);
  }

  handleClick() {
    console.log(this.state.selected);
  }

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
            <Dropdown 
              action = {this.handler}
            />
          </div>
          <div className = "col-md-4">
            <Button 
              onClick = {() => this.handleClick()}
            />
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
    this.props.action(selected);
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
